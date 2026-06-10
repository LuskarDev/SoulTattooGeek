function getBase64FromDataUrl(dataUrl = "") {
  const commaIndex = dataUrl.indexOf(",");
  return commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl;
}

function safeText(value) {
  return String(value || "").replace(/[<>&]/g, (char) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;"
  }[char]));
}

async function sendWhatsAppNotification({ mode, form }) {
  const notificationText = `Novo ${mode === "agendamento" ? "agendamento" : "orçamento"} no site Soul Tattoo Geek\nNome: ${form.nome}\nWhatsApp: ${form.whatsapp}\nE-mail: ${form.email}\nLocal: ${form.localCorpo}`;

  if (process.env.WHATSAPP_NOTIFY_WEBHOOK) {
    await fetch(process.env.WHATSAPP_NOTIFY_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: notificationText, message: notificationText, form, mode })
    });
    return;
  }

  if (process.env.WHATSAPP_CLOUD_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_NOTIFY_TO) {
    await fetch(`https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WHATSAPP_CLOUD_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: process.env.WHATSAPP_NOTIFY_TO,
        type: "text",
        text: { body: notificationText }
      })
    });
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido." });
  }

  try {
    const { mode, form, references = [], bodyPhotos = [], pageUrl = "" } = req.body || {};

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        message: "RESEND_API_KEY não configurada na Vercel. Configure a chave para enviar e-mails com anexos."
      });
    }

    const to = process.env.REQUEST_TO_EMAIL || "contato@soultattoogeek.com";
    const from = process.env.REQUEST_FROM_EMAIL || "Soul Tattoo Geek <onboarding@resend.dev>";

    const title = mode === "agendamento" ? "Novo pedido de agendamento" : "Novo pedido de orçamento";
    const scheduleHtml = mode === "agendamento" ? `
      <h2>Agendamento desejado</h2>
      <p><b>Data:</b> ${safeText(form.dia)}/06/2026</p>
      <p><b>Horário:</b> ${safeText(form.horario)}</p>
      <p><b>Tipo de sessão:</b> ${safeText(form.tipo)}</p>
      <p><b>Tatuador:</b> ${safeText(form.tatuador || "Não escolhido")}</p>
      <p><b>Observações:</b> ${safeText(form.observacoes || "Sem observações")}</p>
    ` : "";

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h1>${safeText(title)}</h1>
        <p><b>Nome:</b> ${safeText(form.nome)}</p>
        <p><b>WhatsApp:</b> ${safeText(form.whatsapp)}</p>
        <p><b>E-mail:</b> ${safeText(form.email)}</p>
        <p><b>Parte do corpo:</b> ${safeText(form.localCorpo)}</p>
        <p><b>Tamanho:</b> ${safeText(form.tamanho)}</p>
        <p><b>Estilo:</b> ${safeText(form.estilo)}</p>
        <p><b>Cor:</b> ${safeText(form.cor)}</p>
        <h2>Ideia</h2>
        <p>${safeText(form.descricao).replace(/\n/g, "<br>")}</p>
        ${scheduleHtml}
        <p><b>Referências anexadas:</b> ${references.length}</p>
        <p><b>Fotos do local do corpo anexadas:</b> ${bodyPhotos.length}</p>
        <p><b>Página:</b> ${safeText(pageUrl)}</p>
      </div>
    `;

    const attachments = [...references, ...bodyPhotos]
      .filter((file) => file && file.dataUrl)
      .slice(0, 10)
      .map((file, index) => ({
        filename: file.name || `anexo-${index + 1}.jpg`,
        content: getBase64FromDataUrl(file.dataUrl)
      }));

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: form.email,
        subject: `${title} - ${form.nome}`,
        html,
        attachments
      })
    });

    const emailResult = await emailResponse.json().catch(() => ({}));

    if (!emailResponse.ok) {
      return res.status(500).json({
        message: emailResult.message || "Erro ao enviar e-mail pelo Resend."
      });
    }

    try {
      await sendWhatsAppNotification({ mode, form });
    } catch (notifyError) {
      console.error("WhatsApp notification error:", notifyError);
    }

    return res.status(200).json({ ok: true, emailId: emailResult.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno ao enviar o pedido." });
  }
};
