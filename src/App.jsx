
import React, { useEffect, useMemo, useState } from "react";
import ScrollReveal from "scrollreveal";
import {
  Camera, MessageCircle, ArrowRight, Star, Clock, PenTool, MapPin, Gamepad2,
  CalendarDays, UploadCloud, Lock, Send, Image as ImageIcon, Heart, ShieldCheck,
  Sparkles, Droplets, WineOff, Bed, Shirt, Utensils, 
  Sun, Hand, AlertTriangle, Phone, Mail, ChevronDown, ChevronUp, BadgeCheck, UserRound,
  Palette, Skull, Flame, Eye, CircleDollarSign, Headphones, CheckCircle2, Users
} from "lucide-react";
import "./styles.css";

const A = "/assets/";
const I = "/assets/icon-pack/curated/";

const WHATSAPP_NUMBER = "5521987654321";
const GOOGLE_MAPS_QUERY = "Soul Tattoo Geek Trindade São Gonçalo RJ";
const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(GOOGLE_MAPS_QUERY)}&output=embed`;
const GOOGLE_MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GOOGLE_MAPS_QUERY)}`;

const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || "";
const INSTAGRAM_API_URL = INSTAGRAM_ACCESS_TOKEN
  ? `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=24&access_token=${INSTAGRAM_ACCESS_TOKEN}`
  : "";

const STUDIO_INFO = {
  name: "Soul Tattoo Geek",
  whatsappDisplay: "(21) 98765-4321",
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: "@soultattoogeek",
  instagramUrl: "https://instagram.com/soultattoogeek",
  location: "Trindade, São Gonçalo - RJ",
  hours: "Segunda a sábado, com hora marcada",
  minPrice: "A partir de R$ 600,00",
  signal: "50% do valor mínimo da sessão para reservar horário",
  seoPhrase: "tatuagem geek em São Gonçalo, tatuagem anime RJ e tatuador geek São Gonçalo"
};

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function useIsMobile(maxWidth = 760) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setIsMobile(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [maxWidth]);

  return isMobile;
}

function useRevealAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const groups = [
      {
        selector: ".sectionTitle, .portfolioReferenceHead, .teamHeading, .careHeadingBlock, .contactReferenceTitleWrap",
        origin: "top",
        className: "sr-anim-top"
      },
      {
        selector: ".heroText, .aboutText, .faqLeft, .contactReferenceLeft, .teamLeadContent, .careIntroBlock",
        origin: "left",
        className: "sr-anim-left"
      },
      {
        selector: ".heroVisual, .aboutMedia, .contactReferenceMapWrap, .teamLeadMedia, .unifiedSide",
        origin: "right",
        className: "sr-anim-right"
      },
      {
        selector: ".styleCard, .portfolioReferenceCardLink, .teamMetricCard, .teamMemberCard, .teamValueItem, .careShowcaseCard, .testimonial, .faqItem, .contactReferenceCard, .termCard",
        origin: "bottom",
        className: "sr-anim-bottom"
      },
      {
        selector: ".modeSwitch, .form, .quoteLayout, .bookingBox, .cta, .careEmergencyBar, .portfolioReferenceFilters, .portfolioReferenceButtonWrap, .studioFooterCleanInner",
        origin: "bottom",
        className: "sr-anim-bottom"
      }
    ];

    document.documentElement.classList.add("scrollreveal-enabled");

    groups.forEach((group) => {
      document.querySelectorAll(group.selector).forEach((element, index) => {
        element.classList.add("sr-real-item", group.className);
        element.style.setProperty("--sr-delay", `${Math.min(index % 6, 5) * 90}ms`);
      });
    });

    const sr = ScrollReveal({
      distance: "1px",
      duration: 1,
      delay: 0,
      opacity: 1,
      scale: 1,
      reset: false,
      mobile: true,
      cleanup: false,
      viewFactor: 0.10,
      viewOffset: { top: 80, right: 0, bottom: 80, left: 0 }
    });

    groups.forEach((group) => {
      sr.reveal(group.selector, {
        origin: group.origin,
        interval: 100,
        beforeReveal: (element) => {
          element.classList.add("sr-play");
        },
        afterReveal: (element) => {
          element.classList.add("sr-finished");
        }
      });
    });

    return () => {
      if (sr && sr.destroy) sr.destroy();
      document.documentElement.classList.remove("scrollreveal-enabled");
    };
  }, []);
}


const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Estilos", href: "#estilos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Orçamento e Agenda", href: "#orcamento" },
  { label: "Cuidados", href: "#cuidados" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" }
];


function ImgIcon({ src, alt = "", className = "" }) {
  return <img src={src} alt={alt} className={["imgIcon", className].filter(Boolean).join(" ")} />;
}


function CTA({ text, btn, href = "#orcamento" }) {
  return (
    <div className="cta">
      <div className="ctaLeft">
        <img src={A + 'mascot.png'} alt="" loading="lazy" />
        <div>
          <b>{text}</b>
          <p>Fale com a Soul Tattoo Geek e transforme sua ideia em uma tattoo única.</p>
        </div>
      </div>
      <a className="btn primary" href={href}>
        {btn}
        <ArrowRight size={18} />
      </a>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const sectionIds = nav.map((item) => item.href.replace("#", ""));

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 170;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  return (
    <header className="header">
      <a
        className="brand"
        href="#inicio"
        aria-label="Soul Tattoo Geek"
        onClick={(event) => {
          event.preventDefault();
          setActiveSection("inicio");
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.replaceState(null, "", "#inicio");
          setOpen(false);
        }}
      >
        <img src={A + "logo.png"} alt="Soul Tattoo Geek" />
      </a>

      <button className="menuButton" onClick={() => setOpen(!open)}>☰</button>

      <nav className={open ? "nav open" : "nav"}>
        {nav.map(item => {
          const id = item.href.replace("#", "");
          return (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === id ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                setOpen(false);
                setActiveSection(id);
                const section = document.getElementById(id);
                if (section) {
                  const top = section.getBoundingClientRect().top + window.scrollY - 96;
                  window.scrollTo({ top, behavior: "smooth" });
                  window.history.replaceState(null, "", item.href);
                }
              }}
            >
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="headerActions">
        <a className="iconBtn" href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram Soul Tattoo Geek"><ImgIcon src={I + "instagram.png"} className="socialImgIcon" /></a>
        <a className="iconBtn" href={STUDIO_INFO.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp Soul Tattoo Geek"><ImgIcon src={I + "whatsapp.png"} className="socialImgIcon" /></a>
        <a className="budgetTop" href="#orcamento">Orçamento / Agendar <ImgIcon src={I + "arrow-right.png"} className="buttonImgIcon" /></a>
      </div>
    </header>
  );
}

function Tag({ children, icon: Icon = Star }) {
  return <span className="tag"><Icon size={16}/>{children}</span>
}

function SectionTitle({ tag, title, highlight, children }) {
  return (
    <div className="sectionTitle">
      <Tag>{tag}</Tag>
      <h2>{title} {highlight && <span>{highlight}</span>}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}

function Home() {
  return (
    <section id="inicio" className="section hero">
      <div className="heroText">
        <Tag>TATUAGENS QUE CONTAM HISTÓRIAS</Tag>
        <h1>Tattoo Geek com <span>personalidade.</span></h1>
        <p>Do <b>anime</b> ao <b>game</b>, do mangá ao pop: somos um estúdio de <b>tatuagem geek em São Gonçalo</b>, com foco em <b>tatuagem anime RJ</b>, artes autorais e qualidade que marca.</p>
        <div className="actions">
          <a className="btn primary" href="#portfolio"><PenTool size={20}/>Ver portfólio</a>
          <a className="btn ghost" href="#orcamento"><CalendarDays size={20}/>Pedir orçamento</a>
        </div>

        <div className="quickInfo">
          <div><ImgIcon src={I + "clock.png"} className="infoImgIcon"/><span>Atendimento com<br/><b>hora marcada</b></span></div>
          <div><ImgIcon src={I + "pen.png"} className="infoImgIcon"/><span><b>Arte autoral</b><br/>e exclusiva</span></div>
          <div><ImgIcon src={I + "map-pin.png"} className="infoImgIcon"/><span><b>{STUDIO_INFO.location}</b><br/>Studio privado</span></div>
        </div>
      </div>
      <div className="heroVisual">
        <img className="heroCollage" src={A + "tattoos-collage.png"} alt="Tatuagens geek" />
        {/* Foto das duas pessoas e selo removidos para deixar apenas a arte das tatuagens */}
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="section about">
      <div className="aboutText">
        <SectionTitle tag="NOSSA ESSÊNCIA" title="Tatuagens que capturam a" highlight="alma geek.">
          No Soul Tattoo Geek, transformamos paixão em arte. Unimos criatividade, técnica e cultura pop para criar tatuagens autorais que vão além da pele: são histórias, memórias e identidade.
        </SectionTitle>

        <div className="featureLine">
          <ImgIcon src={I + "headset.png"} className="featureImgIcon"/>
          <div><b>Atendimento com hora marcada</b><span>Cada projeto é único. Trabalhamos com foco total em você e na sua ideia.</span></div>
          <a className="miniBtn" href="#orcamento"><ImgIcon src={I + "calendar.png"} className="miniBtnIcon"/>Agendar horário</a>
        </div>

        <div className="aboutCards">
          <Card icon={PenTool} title="Arte autoral">Criamos tatuagens exclusivas inspiradas em animes, mangás, games, filmes e cultura pop.</Card>
          <Card icon={Clock} title="Atendimento com hora marcada">Mais conforto, mais atenção e mais qualidade do primeiro traço à finalização.</Card>
          <Card icon={Gamepad2} title="Experiência geek">Entre quadros, colecionáveis e boas conversas, você se sente em casa.</Card>
        </div>
      </div>

      <div className="aboutMedia">
        <img src={A + "artists.png"} alt="Equipe Soul Tattoo Geek" loading="lazy" />
        <div className="mission">
          <Tag>NOSSA MISSÃO</Tag>
          <p>Marcar histórias na pele com arte, respeito e autenticidade, valorizando a individualidade e a cultura geek em cada traço.</p>
          <div className="chips"><span>Autenticidade</span><span>Respeito</span><span>Criatividade</span><span>Qualidade</span></div>
        </div>
      </div>
    </section>
  )
}

function Card({ icon: Icon, title, children }) {
  return <div className="card"><Icon className="cardIcon"/><h3>{title}</h3><p>{children}</p></div>
}

const styles = [
  ["Anime & Geek", "Personagens, cenas e referências dos seus animes, mangás e jogos favoritos.", "pieces/anime_only.png", Skull],
  ["Blackwork", "Tatuagens com alto contraste e preenchimentos sólidos em preto.", "pieces/blackwork_only.png", CircleDollarSign],
  ["Fine Line", "Traços finos, delicados e precisos para composições sutis.", "pieces/fineline_only.png", PenTool],
  ["Colorida", "Cores vibrantes, degradês e sombreados com intensidade.", "pieces/colorida_only.png", Palette],
  ["Minimalista", "Menos é mais: traços simples e elegantes com significado.", "pieces/minimalista_only.png", Sparkles],
  ["Autoral", "Criações exclusivas desenvolvidas do zero para eternizar sua ideia.", "pieces/autoral_only.png", Flame]
];

function Estilos() {
  const isMobile = useIsMobile();
  const [showAllStyles, setShowAllStyles] = useState(false);
  const visibleStyles = isMobile && !showAllStyles ? styles.slice(0, 3) : styles;

  useEffect(() => {
    if (!isMobile) setShowAllStyles(false);
  }, [isMobile]);

  return (
    <section id="estilos" className="section stylesSec">
      <SectionTitle tag="NOSSA ARTE, DO SEU JEITO" title="Estilos de" highlight="Tattoo">
        Cada traço carrega uma história. Aqui, unimos técnica, criatividade e referências do universo geek para transformar ideias em tattoos únicas.
      </SectionTitle>
      <div className="styleGrid">
        {visibleStyles.map(([title, desc, img, Icon], i) => (
          <div className="styleCard" key={title}>
            <img src={A + img} alt={title} loading="lazy" style={{objectPosition: `${(i%3)*40}% ${i>2?80:15}%`}} />
            <div>
              <span className="roundIcon"><Icon size={22}/></span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href="#portfolio">Ver exemplos <ArrowRight size={16}/></a>
            </div>
          </div>
        ))}
      </div>

      {isMobile && styles.length > 3 && (
        <div className="mobileShowMoreWrap">
          <button className="mobileShowMoreBtn" type="button" onClick={() => setShowAllStyles((value) => !value)}>
            {showAllStyles ? "Ver menos estilos" : "Ver mais estilos"}
            <ArrowRight size={18}/>
          </button>
        </div>
      )}

      <CTA text="Não encontrou o estilo que procura?" btn="Pedir orçamento" href="#orcamento"/>
    </section>
  )
}


const portfolioItems = [
  { title: "GOKU", subtitle: "Dragon Ball", categories: ["Anime", "Geek"], image: "instagram/ig_sketch_arm.jpg", pos: "50% 22%" },
  { title: "ITACHI", subtitle: "Naruto", categories: ["Anime", "Geek"], image: "instagram/ig_11_spiral_portrait.jpg", pos: "50% 18%" },
  { title: "EVANGELION 01", subtitle: "Neon Genesis Evangelion", categories: ["Anime", "Geek"], image: "instagram/ig_color_woman.jpg", pos: "50% 35%" },
  { title: "GUTS", subtitle: "Berserk", categories: ["Anime", "Blackwork"], image: "instagram/ig_black_sleeve.jpg", pos: "48% 32%" },
  { title: "LINK", subtitle: "The Legend of Zelda", categories: ["Games", "Geek"], image: "instagram/ig_10_color_portrait.jpg", pos: "50% 20%" },
  { title: "LEVI", subtitle: "Attack on Titan", categories: ["Anime", "Geek"], image: "instagram/ig_levi.jpg", pos: "50% 24%" },
  { title: "SHARINGAN", subtitle: "Naruto", categories: ["Anime", "Geek", "Blackwork"], image: "instagram/ig_spiral.jpg", pos: "50% 44%" },
  { title: "MAJORA'S MASK", subtitle: "The Legend of Zelda", categories: ["Games", "Coloridas"], image: "instagram/ig_cat_mask.jpg", pos: "50% 36%" },
  { title: "GAMER", subtitle: "Paixão sem limites", categories: ["Games", "Geek", "Blackwork"], image: "instagram/ig_abstract_leg.jpg", pos: "50% 38%" },
  { title: "DRAGÃO", subtitle: "Colorida", categories: ["Coloridas", "Geek"], image: "instagram/ig_dragon_color.jpg", pos: "50% 25%" }
];

function Portfolio() {
  const filters = [
    { label: "Todos", icon: I + "sparkle.png" },
    { label: "Anime", icon: I + "star.png" },
    { label: "Geek", icon: A + "mascot.png" },
    { label: "Games", icon: I + "gamepad.png" },
    { label: "Blackwork", icon: I + "badge.png" },
    { label: "Coloridas", icon: I + "palette.png" }
  ];

  const isMobile = useIsMobile();
  const [showAllPortfolio, setShowAllPortfolio] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [instagramItems, setInstagramItems] = useState([]);
  const [instagramLoading, setInstagramLoading] = useState(Boolean(INSTAGRAM_API_URL));
  const [instagramError, setInstagramError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadInstagramPosts() {
      if (!INSTAGRAM_API_URL) {
        setInstagramLoading(false);
        return;
      }

      try {
        const response = await fetch(INSTAGRAM_API_URL);
        if (!response.ok) throw new Error("Não foi possível carregar o Instagram agora.");

        const result = await response.json();
        const items = (result.data || [])
          .filter((post) => post.media_url || post.thumbnail_url)
          .map((post, index) => {
            const cleanCaption = (post.caption || "").replace(/\s+/g, " ").trim();
            const firstLine = cleanCaption.split(".")[0] || cleanCaption.split("#")[0] || `Post ${index + 1}`;
            return {
              title: firstLine.slice(0, 32) || `Post ${index + 1}`,
              subtitle: "Instagram Soul Tattoo Geek",
              categories: ["Instagram"],
              image: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
              permalink: post.permalink,
              external: true
            };
          });

        if (!cancelled) {
          setInstagramItems(items);
          setInstagramError("");
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setInstagramError("Não foi possível carregar o Instagram ao vivo. Mostrando galeria local.");
        }
      } finally {
        if (!cancelled) setInstagramLoading(false);
      }
    }

    loadInstagramPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setShowAllPortfolio(false);
  }, [activeFilter, isMobile]);

  const filteredItems = useMemo(() => {
    const sourceItems = instagramItems.length && activeFilter === "Todos" ? instagramItems : portfolioItems;
    if (activeFilter === "Todos") return sourceItems;
    return portfolioItems.filter((item) => item.categories.includes(activeFilter));
  }, [activeFilter, instagramItems]);

  const visiblePortfolioItems = isMobile && !showAllPortfolio ? filteredItems.slice(0, 3) : filteredItems;

  return (
    <section id="portfolio" className="section portfolio portfolioReferenceSection">
      <div className="portfolioReferenceHead">
        <div className="portfolioReferenceBadge">
          <ImgIcon src={I + "sparkle.png"} alt="" className="portfolioBadgeIcon" />
          PORTFÓLIO
        </div>

        <div className="portfolioReferenceTitleRow">
          <div className="portfolioReferenceTitleWrap">
            <h2>
              <span>PORTFÓLIO</span>
              <strong>QUE FALA POR SI</strong>
            </h2>
          </div>
          <img src={A + 'logo-oficial.png'} alt="Soul Tattoo Geek" className="portfolioReferenceLogo" loading="lazy" />
        </div>

        <p className="portfolioReferenceLead">
          Cada traço carrega mais que tinta: carrega história, paixão e identidade.
          Confira os trabalhos autorais e as postagens do Instagram da <b>Soul Tattoo Geek</b>.
        </p>

        <div className="instagramLiveNotice">
          {INSTAGRAM_API_URL ? (
            instagramLoading ? (
              <span>Carregando fotos recentes do Instagram...</span>
            ) : instagramItems.length ? (
              <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer">
                Galeria conectada ao Instagram do estúdio
                <ImgIcon src={I + "instagram.png"} alt="" className="buttonImgIcon" />
              </a>
            ) : (
              <span>{instagramError || "Galeria local ativa enquanto o Instagram não retorna fotos."}</span>
            )
          ) : (
            <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer">
              Abrir Instagram do estúdio
              <ImgIcon src={I + "instagram.png"} alt="" className="buttonImgIcon" />
            </a>
          )}
        </div>
      </div>

      <div className="portfolioReferenceFilters" role="tablist" aria-label="Filtros do portfólio">
        {filters.map((f) => (
          <button
            className={activeFilter === f.label ? "active" : ""}
            key={f.label}
            type="button"
            onClick={() => setActiveFilter(f.label)}
          >
            <ImgIcon src={f.icon} alt="" className="portfolioFilterIcon" />
            {f.label}
          </button>
        ))}
      </div>

      <div className="portfolioReferenceGrid">
        {visiblePortfolioItems.map((it, index) => {
          const src = it.external ? it.image : A + it.image;
          const card = (
            <article className="portfolioReferenceCard">
              <img src={src} alt={it.title} loading="lazy" style={it.pos ? { objectPosition: it.pos } : undefined} />
              <div className="portfolioReferenceOverlay">
                <div className="portfolioReferenceMeta">
                  <div>
                    <b>{it.title}</b>
                    <span>{it.subtitle}</span>
                  </div>
                </div>
              </div>
            </article>
          );

          return it.external && it.permalink ? (
            <a className="portfolioReferenceCardLink" href={it.permalink} target="_blank" rel="noreferrer" key={it.permalink}>
              {card}
            </a>
          ) : (
            <div className="portfolioReferenceCardLink" key={`${it.title}-${index}`}>
              {card}
            </div>
          );
        })}
      </div>

      <div className="portfolioReferenceButtonWrap">
        <span className="portfolioReferenceLine" />
        {isMobile && filteredItems.length > 3 ? (
          <button className="portfolioReferenceButton" type="button" onClick={() => setShowAllPortfolio((value) => !value)}>
            <Eye size={20} />
            {showAllPortfolio ? "VER MENOS TRABALHOS" : "VER MAIS TRABALHOS"}
          </button>
        ) : (
          <a className="portfolioReferenceButton" href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer">
            <ImgIcon src={I + "instagram.png"} className="buttonImgIcon" alt="Instagram" />
            VER MAIS NO INSTAGRAM
          </a>
        )}
        <span className="portfolioReferenceLine" />
      </div>
    </section>
  )
}


function Artista() {
  const studioMetrics = [
    { icon: Star, value: "+800", label: "Tatuagens realizadas", text: "entre projetos autorais, personalizados e sessões especiais." },
    { icon: Clock, value: "10+ anos", label: "De experiência", text: "dedicação total à arte, ao atendimento e ao acabamento." },
    { icon: Heart, value: "100%", label: "Foco e paixão", text: "cada detalhe é pensado para entregar uma tattoo com identidade." }
  ];

  const artists = [
    {
      name: "Lucas SoulInk",
      email: "contato@soultattoogeek.com",
      role: "Artista principal • Anime, Geek e Realismo",
      desc: "Responsável por transformar ideias em arte na pele, com foco em composição, identidade, técnica e acabamento marcante.",
      quote: "Cada tattoo carrega uma história. Minha missão é eternizar a sua com personalidade, técnica e atitude.",
      image: "artists.png",
      pos: "center",
      tags: ["Anime", "Geek", "Realismo", "Black & Grey", "Colorido"],
      badge: "+10 anos",
      badgeText: "de experiência"
    },
    {
      name: "Mika Hoshi",
      email: "mika@soultattoogeek.com",
      role: "Tatuadora • Anime Colorido",
      desc: "Especialista em personagens, cores vibrantes, mangá, anime e composições com energia visual forte.",
      quote: "Meu foco é criar tattoos coloridas com presença, energia e personalidade geek.",
      image: "pieces/colorida_only.png",
      pos: "center",
      tags: ["Anime", "Colorido", "Geek"],
      badge: "Color",
      badgeText: "anime tattoo"
    },
    {
      name: "Victor Noir",
      email: "victor@soultattoogeek.com",
      role: "Tatuador • Blackwork",
      desc: "Projetos com contraste forte, dark art, linhas pesadas, simbolismo e tatuagens de impacto visual.",
      quote: "Blackwork é impacto, contraste e intenção. Cada sombra precisa conversar com a pele.",
      image: "pieces/blackwork_only.png",
      pos: "center",
      tags: ["Blackwork", "Dark Art", "Black & Grey"],
      badge: "Dark",
      badgeText: "blackwork"
    },
    {
      name: "Luna Fine",
      email: "luna@soultattoogeek.com",
      role: "Tatuadora • Fine Line",
      desc: "Traços finos, delicados e minimalistas, perfeita para tattoos elegantes e detalhadas com acabamento limpo.",
      quote: "No fine line, cada milímetro importa. Delicadeza também pode carregar muita atitude.",
      image: "pieces/fineline_only.png",
      pos: "center",
      tags: ["Fine Line", "Minimalista", "Delicada"],
      badge: "Fine",
      badgeText: "line art"
    }
  ];

  const [featuredArtist, setFeaturedArtist] = useState(artists[0]);
  const rosterArtists = artists.filter((artist) => artist.name !== featuredArtist.name);

  const studioValues = [
    { icon: ShieldCheck, title: "Materiais premium", text: "Utilizamos materiais certificados e foco total na biossegurança." },
    { icon: PenTool, title: "Arte personalizada", text: "Cada projeto é pensado com identidade, leitura e encaixe na pele." },
    { icon: Flame, title: "Estilo autêntico", text: "Anime, geek, blackwork, colorida, fine line e criações autorais." },
    { icon: Clock, title: "Atendimento com hora marcada", text: "Mais atenção, conforto e organização em cada etapa da experiência." }
  ];

  return (
    <section id="artista" className="section artist teamSection">
      <div className="teamHeading sectionTitle">
        <Tag>EQUIPE SOUL TATTOO GEEK</Tag>
        <h2>
          Artista /{" "}
          <span className="teamHeadingWord">Equipe</span>
        </h2>
        <p>
          Clique em um tatuador da equipe para colocar ele em destaque e ver mais detalhes do estilo.
        </p>
      </div>

      <div className="teamShowcase">
        <div className="teamLeadPanel teamLeadPanelInteractive" key={featuredArtist.name}>
          <div className="teamLeadMedia">
            <img src={A + featuredArtist.image} alt={featuredArtist.name} loading="lazy" style={{ objectPosition: featuredArtist.pos }} />
            <div className="teamFloatingBadge">
              <b>{featuredArtist.badge}</b>
              <span>{featuredArtist.badgeText}</span>
            </div>
          </div>

          <div className="teamLeadContent">
            <Tag>ARTISTA EM DESTAQUE</Tag>
            <h3>
              {featuredArtist.name.split(" ")[0]} <span>{featuredArtist.name.split(" ").slice(1).join(" ")}</span>
            </h3>
            <p className="teamLeadRole">{featuredArtist.role}</p>
            <p className="teamLeadQuote">
              “{featuredArtist.quote}”
            </p>
            <p>{featuredArtist.desc}</p>

            <div className="teamSpecGroup">
              <small>Especialidades</small>
              <div className="chips teamMainChips">
                {featuredArtist.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="teamLeadLinks">
              <a className="btn primary" href="#orcamento">Solicitar orçamento <ArrowRight size={18} /></a>
              <a className="btn ghost" href={`mailto:${featuredArtist.email}`}>
                <Mail size={16}/> {featuredArtist.email}
              </a>
            </div>
          </div>
        </div>

        <div className="teamMetricsColumn">
          {studioMetrics.map((item) => (
            <div className="teamMetricCard card" key={item.value}>
              <item.icon className="cardIcon" />
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="teamRosterIntro">
        <Tag>INTEGRANTES DO ESTÚDIO</Tag>
        <p>
          Toque em qualquer integrante abaixo para trocar com o artista em destaque.
        </p>
      </div>

      <div className="teamRosterGrid">
        {rosterArtists.map((member) => (
          <button
            type="button"
            className="teamMemberCard card teamMemberButton"
            key={member.name}
            onClick={() => {
              setFeaturedArtist(member);
              document.querySelector("#artista .teamShowcase")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            <div className="teamMemberTop">
              <div className="teamMemberAvatar">
                <img src={A + member.image} alt={member.name} loading="lazy" style={{ objectPosition: member.pos }} />
              </div>
              <div className="teamMemberContent">
                <span className="teamMemberRole">{member.role}</span>
                <h4>{member.name}</h4>
                <p>{member.desc}</p>
              </div>
            </div>
            <div className="teamMemberTags">
              {member.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="teamMemberLinks teamEmailOnly">
              <span>
                <Eye size={14} />
                Ver em destaque
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="teamValuesBar">
        {studioValues.map((item) => (
          <div className="teamValueItem" key={item.title}>
            <item.icon />
            <div>
              <b>{item.title}</b>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


const bodyParts = [
  { name: "Antebraço", note: "ótimo para anime e lettering" },
  { name: "Braço", note: "bom para artes médias" },
  { name: "Ombro", note: "encaixa bem em símbolos" },
  { name: "Pulso", note: "ideal para tattoos pequenas" },
  { name: "Mão", note: "visual forte e aparente" },
  { name: "Peito", note: "bom para peças marcantes" },
  { name: "Costela", note: "área elegante e vertical" },
  { name: "Costas", note: "perfeita para artes grandes" },
  { name: "Coxa", note: "excelente para coloridas" },
  { name: "Panturrilha", note: "ótima para personagens" },
  { name: "Canela", note: "visual impactante" },
  { name: "Tornozelo", note: "discreto e minimalista" },
  { name: "Nuca", note: "discreto e estiloso" },
  { name: "Pescoço", note: "área de alto impacto" }
];

const times = ["10:00","11:30","13:00","14:30","16:00","17:30","19:00","20:30"];

const sessionTypes = [
  { name: "Sessão personalizada (arte autoral)", note: "projeto criado do zero" },
  { name: "Fechamento / continuação", note: "continuação de peça maior" },
  { name: "Retoque", note: "correção ou reforço de traço" },
  { name: "Cover-up", note: "cobertura de tattoo antiga" },
  { name: "Consulta presencial", note: "avaliar ideia antes da sessão" }
];

const tattooArtists = [
  { name: "Lucas SoulInk",
      email: "lucas@soultattoogeek.com", note: "artista principal • anime, geek, realismo e black & grey" },
  { name: "Mika Hoshi",
      email: "mika@soultattoogeek.com", note: "tatuadora • anime colorido, personagens e cultura pop" },
  { name: "Victor Noir",
      email: "victor@soultattoogeek.com", note: "tatuador • blackwork, dark art e alto contraste" },
  { name: "Luna Fine",
      email: "luna@soultattoogeek.com", note: "tatuadora • fine line, minimalista e traços delicados" },
  { name: "Quero indicação do estúdio", note: "a equipe escolhe o melhor artista para sua ideia" }
];




const studioTerms = [
  { icon: CalendarDays, title: "Termos de agendamento", text: "O horário só é considerado reservado após confirmação da equipe por e-mail/WhatsApp e pagamento do sinal quando solicitado." },
  { icon: CircleDollarSign, title: "Aviso sobre sinal", text: `${STUDIO_INFO.signal}. Em caso de remarcação, avise com antecedência para análise da equipe.` },
  { icon: UserRound, title: "Idade mínima", text: "Atendimentos seguem as regras do estúdio e a legislação aplicável. Menores precisam de responsável legal." },
  { icon: ShieldCheck, title: "Autorização para menores", text: "Quando permitido, o menor deve estar acompanhado do responsável e apresentar autorização/documentação solicitada." },
  { icon: Heart, title: "Responsabilidade pós-tattoo", text: "O resultado final também depende dos cuidados feitos pelo cliente durante a cicatrização." },
  { icon: Clock, title: "Horários e preços", text: `${STUDIO_INFO.hours}. Preço mínimo: ${STUDIO_INFO.minPrice}. Valores variam por tamanho, local e complexidade.` }
];

function fileToPayload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      dataUrl: reader.result
    });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function TermsModal({ open, onClose, onAccept }) {
  if (!open) return null;

  return (
    <div className="termsModalOverlay" role="dialog" aria-modal="true" aria-label="Termos de uso">
      <div className="termsModal">
        <button className="termsModalClose" type="button" onClick={onClose} aria-label="Fechar termos">×</button>
        <div className="termsModalHead">
          <Tag icon={BadgeCheck}>SEGURANÇA E TRANSPARÊNCIA</Tag>
          <h2>Termos <span>de uso</span></h2>
          <p>Leia antes de enviar seu orçamento ou pedido de agendamento.</p>
        </div>

        <div className="termsGrid termsGridModal">
          {studioTerms.map(({ icon: Icon, title, text }) => (
            <div className="termCard" key={title}>
              <Icon/>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="termsNotice">
          <BadgeCheck/>
          <span>Antes de tatuar, a equipe confirma ideia, local do corpo, tamanho, valor, sinal, horário e cuidados necessários.</span>
        </div>

        <button className="btn primary full" type="button" onClick={onAccept}>Entendi os termos</button>
      </div>
    </div>
  );
}

function Orcamento() {
  const days = Array.from({length: 30}, (_,i)=>i+1);
  const [mode, setMode] = useState("orcamento");
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    localCorpo: "",
    tamanho: "",
    estilo: "",
    cor: "",
    descricao: "",
    dia: 10,
    horario: "11:30",
    tipo: "Sessão personalizada (arte autoral)",
    tatuador: "",
    observacoes: "",
    termosAceitos: false
  });
  const [errors, setErrors] = useState({});
  const [referenceFiles, setReferenceFiles] = useState([]);
  const [bodyLocationFiles, setBodyLocationFiles] = useState([]);
  const [termsOpen, setTermsOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitStatus("");
  };

  const mapFiles = (files) => Array.from(files || []).slice(0, 5).map((file) => ({
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
  }));

  const handleReferenceFiles = (event) => {
    setReferenceFiles(mapFiles(event.target.files));
  };

  const handleBodyLocationFiles = (event) => {
    setBodyLocationFiles(mapFiles(event.target.files));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.nome.trim()) nextErrors.nome = "Informe seu nome.";
    if (onlyDigits(form.whatsapp).length < 10) nextErrors.whatsapp = "Informe um WhatsApp válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Informe um e-mail válido.";
    if (!form.localCorpo.trim()) nextErrors.localCorpo = "Escolha uma parte do corpo.";
    if (!form.tamanho.trim()) nextErrors.tamanho = "Informe o tamanho aproximado.";
    if (!form.estilo.trim()) nextErrors.estilo = "Escolha ou escreva o estilo.";
    if (!form.cor.trim()) nextErrors.cor = "Informe se será preto/cinza ou colorida.";
    if (form.descricao.trim().length < 10) nextErrors.descricao = "Descreva melhor sua ideia.";
    if (!form.termosAceitos) nextErrors.termosAceitos = "Você precisa confirmar que leu e aceita os termos.";
    if (mode === "agendamento") {
      if (!form.dia) nextErrors.dia = "Escolha uma data.";
      if (!form.horario) nextErrors.horario = "Escolha um horário.";
      if (!form.tipo.trim()) nextErrors.tipo = "Escolha o tipo de sessão.";
      if (!form.tatuador.trim()) nextErrors.tatuador = "Escolha o tatuador ou peça indicação do estúdio.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const sendRequestByEmail = async () => {
    if (!validate()) {
      const firstError = document.querySelector(".fieldError");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSending(true);
    setSubmitStatus("");

    try {
      const references = await Promise.all(referenceFiles.map((item) => fileToPayload(item.file)));
      const bodyPhotos = await Promise.all(bodyLocationFiles.map((item) => fileToPayload(item.file)));

      const response = await fetch("/api/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          form,
          references,
          bodyPhotos,
          pageUrl: window.location.href
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Não foi possível enviar agora.");
      }

      setSubmitStatus("Pedido enviado com sucesso para o e-mail do estúdio. A equipe também receberá uma notificação no WhatsApp se a automação estiver configurada.");
      setReferenceFiles([]);
      setBodyLocationFiles([]);
      setForm((prev) => ({
        ...prev,
        descricao: "",
        observacoes: "",
        termosAceitos: false
      }));
    } catch (error) {
      console.error(error);
      setSubmitStatus(error.message || "Erro ao enviar. Verifique a configuração do e-mail no Vercel.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="orcamento" className="section quote quoteUnified">
      <SectionTitle tag="ORÇAMENTO E AGENDAMENTO" title="Conte sua ideia" highlight="e escolha o próximo passo.">
        A pessoa pode pedir orçamento ou iniciar o agendamento. Agora o pedido é enviado por e-mail com as imagens anexadas, e o estúdio pode receber aviso no WhatsApp.
      </SectionTitle>

      <div className="modeSwitch" role="tablist" aria-label="Escolha o tipo de atendimento">
        <button
          type="button"
          className={mode === "orcamento" ? "active" : ""}
          onClick={() => setMode("orcamento")}
        >
          <Send size={20}/>
          <span>Fazer orçamento</span>
          <small>Para quem ainda quer saber valor, prazo e viabilidade.</small>
        </button>
        <button
          type="button"
          className={mode === "agendamento" ? "active" : ""}
          onClick={() => setMode("agendamento")}
        >
          <CalendarDays size={20}/>
          <span>Já quero marcar</span>
          <small>Para quem já decidiu fazer a tattoo e quer escolher horário.</small>
        </button>
      </div>

      <div className="quoteLayout unifiedLayout">
        <form className="form" onSubmit={(e) => { e.preventDefault(); sendRequestByEmail(); }} noValidate>
          <div className="formBadge">
            {mode === "orcamento" ? <Send size={18}/> : <CalendarDays size={18}/>}
            {mode === "orcamento" ? "Formulário de orçamento" : "Formulário de agendamento"}
          </div>

          <div className="row">
            <Input label="Nome completo *" value={form.nome} onChange={(v)=>update("nome", v)} error={errors.nome} placeholder="Seu nome"/>
            <Input label="WhatsApp *" value={form.whatsapp} onChange={(v)=>update("whatsapp", v)} error={errors.whatsapp} placeholder="(21) 99999-9999"/>
            <Input label="E-mail para retorno *" value={form.email} onChange={(v)=>update("email", v)} error={errors.email} placeholder="seuemail@email.com"/>
          </div>

          <div className="row">
            <Input label="Tamanho aproximado *" value={form.tamanho} onChange={(v)=>update("tamanho", v)} error={errors.tamanho} placeholder="Ex.: 15cm"/>
            <Input label="Estilo desejado *" value={form.estilo} onChange={(v)=>update("estilo", v)} error={errors.estilo} placeholder="Anime, Geek, Blackwork..."/>
            <Input label="Preto e cinza ou colorida? *" value={form.cor} onChange={(v)=>update("cor", v)} error={errors.cor} placeholder="Ex.: Colorida"/>
          </div>

          <CompactOptionList
            label="Parte do corpo recomendada *"
            description="Escolha a área onde pretende tatuar."
            value={form.localCorpo}
            options={bodyParts}
            icon={MapPin}
            onSelect={(value) => update("localCorpo", value)}
            error={errors.localCorpo}
          />

          <CompactOptionList
            label="Tipo de sessão"
            description="Escolha o tipo de atendimento."
            value={form.tipo}
            options={sessionTypes}
            icon={CalendarDays}
            onSelect={(value) => update("tipo", value)}
            compact
          />

          <label className={errors.descricao ? "invalid" : ""}>
            Descrição da ideia *
            <textarea
              value={form.descricao}
              onChange={(e)=>update("descricao", e.target.value)}
              placeholder="Conte sua ideia, referências, personagens, elementos, temas, tamanho desejado e o que não pode faltar..."
            />
            {errors.descricao && <span className="fieldError">{errors.descricao}</span>}
          </label>

          {mode === "agendamento" && (
            <div className="scheduleBookingGroup">
              <CompactOptionList
                label="Tatuador para a sessão *"
                description="Escolha quem vai tatuar ou deixe o estúdio indicar o artista ideal."
                value={form.tatuador}
                options={tattooArtists}
                icon={Users}
                onSelect={(value) => update("tatuador", value)}
                error={errors.tatuador}
              />

              <div className="scheduleInline">
                <div className="calendar compactCalendar">
                  <h3>Escolha a data</h3>
                  <b>Junho 2026</b>
                  <div className="days">
                    {days.map(d=>(
                      <button
                        type="button"
                        className={form.dia===d ? "picked" : d%5===0 ? "few" : ""}
                        key={d}
                        onClick={()=>update("dia", d)}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {errors.dia && <span className="fieldError">{errors.dia}</span>}
                </div>

                <div className="times compactTimes">
                  <h3>Horários disponíveis</h3>
                  {times.map((t)=>(
                    <button
                      type="button"
                      className={form.horario===t ? "active" : ""}
                      key={t}
                      onClick={()=>update("horario", t)}
                    >
                      {t}
                    </button>
                  ))}
                  {errors.horario && <span className="fieldError">{errors.horario}</span>}
                  <div className="price"><Clock/>4 a 6 horas <CircleDollarSign/>{STUDIO_INFO.minPrice}</div>
                </div>
              </div>
            </div>
          )}

          <label className="upload referenceUpload">
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleReferenceFiles}
            />
            <UploadCloud/>
            <span>
              Adicionar imagens de referência
              <br/>
              <small>PNG, JPG ou WEBP. Escolha até 5 imagens.</small>
            </span>
          </label>

          {referenceFiles.length > 0 && (
            <div className="referencePreview">
              {referenceFiles.map((item) => (
                <div className="referenceItem" key={item.name}>
                  {item.preview ? <img src={item.preview} alt={item.name}/> : <ImageIcon/>}
                  <div>
                    <b>{item.name}</b>
                    <small>{(item.size / 1024 / 1024).toFixed(2)} MB</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          <label className="upload referenceUpload bodyPhotoUpload">
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleBodyLocationFiles}
            />
            <Camera/>
            <span>
              Foto do local do corpo onde será a tattoo
              <br/>
              <small>Ajuda o estúdio a avaliar encaixe, tamanho e viabilidade.</small>
            </span>
          </label>

          {bodyLocationFiles.length > 0 && (
            <div className="referencePreview">
              {bodyLocationFiles.map((item) => (
                <div className="referenceItem" key={item.name}>
                  {item.preview ? <img src={item.preview} alt={item.name}/> : <ImageIcon/>}
                  <div>
                    <b>{item.name}</b>
                    <small>{(item.size / 1024 / 1024).toFixed(2)} MB</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          <label className={`termsCheck ${errors.termosAceitos ? "invalid" : ""}`}>
            <input
              type="checkbox"
              checked={form.termosAceitos}
              onChange={(e)=>update("termosAceitos", e.target.checked)}
            />
            <span>
              Estou ciente e aceito os{" "}
              <button type="button" onClick={() => setTermsOpen(true)}>termos de uso</button>
              {" "}do estúdio.
            </span>
          </label>
          {errors.termosAceitos && <span className="fieldError">{errors.termosAceitos}</span>}

          <p className="safe"><Lock size={16}/>O pedido será enviado para o e-mail do estúdio com as imagens anexadas. Após o envio, uma notificação de novo orçamento/agendamento pode ser enviada ao WhatsApp do estúdio pela API configurada.</p>

          {submitStatus && <p className={submitStatus.includes("sucesso") ? "submitStatus success" : "submitStatus error"}>{submitStatus}</p>}

          <button className="btn primary full" type="submit" disabled={sending}>
            {mode === "orcamento" ? <Send/> : <CalendarDays/>}
            {sending ? "Enviando..." : mode === "orcamento" ? "Enviar orçamento por e-mail" : "Enviar pedido de agendamento"}
          </button>
        </form>

        <div className="steps unifiedSide">
          <h3>{mode === "orcamento" ? "Como funciona o orçamento" : "Como funciona o agendamento"}</h3>
          {(mode === "orcamento"
            ? [["Envie sua ideia", "Preencha o formulário com detalhes, referências e foto do local da tattoo."], ["E-mail para o estúdio", "O pedido chega com as imagens anexadas para análise."], ["Aviso no WhatsApp", "O estúdio pode receber uma notificação automática de novo pedido."], ["Aprovação", "Depois do orçamento aprovado, marcamos a sessão."]]
            : [["Escolha o tatuador", "Selecione o artista ou peça indicação do estúdio."], ["Escolha data e horário", "Selecione a data e o horário desejados."], ["Envio por e-mail", "O pedido chega com referências e foto do local do corpo."], ["Confirmação", "A equipe confirma disponibilidade e sinal."]]
          ).map(([t,d],i)=><div className="step" key={t}><span>{i+1}</span><div><b>{t}</b><p>{d}</p></div></div>)}

          <div className="rules miniRules">
            <h3><CalendarDays/>Regras rápidas</h3>
            <b>Sinal</b><p>O agendamento só fica reservado após confirmação do estúdio.</p>
            <b>Atrasos</b><p>Atrasos podem alterar ou remarcar a sessão.</p>
            <b>Local da tattoo</b><p>Algumas áreas exigem avaliação por sensibilidade, exposição e cicatrização.</p>
          </div>
        </div>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} onAccept={() => { update("termosAceitos", true); setTermsOpen(false); }} />
    </section>
  )
}



function CompactOptionList({ label, description, value, options, icon: Icon, onSelect, error, compact = false }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((item) => item.name === value);

  return (
    <div className={`compactOption ${compact ? "compactOptionSmall" : ""} ${error ? "invalid" : ""}`}>
      <div className="labelHeader compactLabelHeader">
        <b>{label}</b>
        {description && <span>{description}</span>}
      </div>

      <button
        type="button"
        className={`compactOptionTrigger ${open ? "open" : ""}`}
        onClick={() => setOpen((state) => !state)}
      >
        <span className="triggerIcon">{Icon ? <Icon size={18}/> : <MapPin size={18}/>}</span>
        <span className="triggerText">
          <b>{selected?.name || "Selecione uma opção"}</b>
          <small>{selected?.note || "Clique para abrir a lista"}</small>
        </span>
        <span className="triggerArrow">⌄</span>
      </button>

      {open && (
        <div className="compactOptionMenu">
          {options.map((item) => (
            <button
              type="button"
              key={item.name}
              className={value === item.name ? "selected" : ""}
              onClick={() => {
                onSelect(item.name);
                setOpen(false);
              }}
            >
              <span>{Icon ? <Icon size={16}/> : <MapPin size={16}/>}</span>
              <b>{item.name}</b>
              <small>{item.note}</small>
            </button>
          ))}
        </div>
      )}

      {error && <span className="fieldError">{error}</span>}
    </div>
  )
}

function Input({label, placeholder, value, onChange, error}) {
  return (
    <label className={error ? "invalid" : ""}>
      {label}
      <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}/>
      {error && <span className="fieldError">{error}</span>}
    </label>
  )
}



function Cuidados() {
  const beforeItems = [
    { icon: I + "drink.png", title: "Hidrate-se bem", text: "Beba bastante água nos dias anteriores para deixar a pele saudável." },
    { icon: I + "no-alcohol.png", title: "Evite álcool e drogas", text: "Evite consumir álcool e substâncias nas 24h que antecedem a sessão." },
    { icon: I + "bed.png", title: "Descanse bem", text: "Uma boa noite de sono ajuda seu corpo a aguentar melhor a sessão." },
    { icon: I + "shirt.png", title: "Vista-se com conforto", text: "Prefira roupas leves e confortáveis para não irritar a área tatuada." },
    { icon: I + "food.png", title: "Alimente-se bem", text: "Faça uma refeição leve e balanceada antes de vir para o estúdio." }
  ];

  const afterItems = [
    { icon: I + "soap.png", title: "Lave com sabonete neutro", text: "Lave suavemente 2 a 3 vezes ao dia com sabonete neutro e água fria." },
    { icon: I + "pen.png", title: "Use a pomada indicada", text: "Aplique uma camada fina da pomada recomendada pelo seu tatuador." },
    { icon: I + "sun.png", title: "Evite sol e calor excessivo", text: "Nada de sol, praia, piscina ou sauna até a cicatrização completa." },
    { icon: I + "hand.png", title: "Não arranque casquinhas", text: "Deixe a cicatrização seguir o curso natural. Isso evita falhas e manchas." },
    { icon: I + "shirt.png", title: "Use roupas leves e limpas", text: "Evite roupas apertadas e tecidos que possam irritar a tattoo." }
  ];

  return (
    <section id="cuidados" className="section care professionalCare carePageInspired">
      <div className="careHeroTop">
        <div className="careHeadingBlock">
          <Tag>CUIDAR É PARTE DA ARTE</Tag>
          <h2>Cuidados</h2>
          <span className="careUnderline" />
        </div>

        <div className="careIntroBlock">
          <p>
            Seguir os cuidados corretamente faz toda a <b>diferença</b> no resultado da sua tattoo.
            Confira o que fazer <b>antes e depois</b> da sessão para garantir uma <b>cicatrização</b>
            segura e uma tattoo <b>incrível</b> por muito mais tempo.
          </p>
        </div>
      </div>

      <div className="careHighlightGrid">
        <CareShowcaseCard title="Antes da tattoo" accent="before" items={beforeItems} />

        <div className="careCenterAccent" aria-hidden="true">
          <img src={A + 'icon-pack/raw/s09_013.png'} alt="" loading="lazy" />
        </div>

        <CareShowcaseCard title="Depois da tattoo" accent="after" items={afterItems} />
      </div>

      <div className="careEmergencyBar">
        <div className="careEmergencyInfo">
          <div className="careEmergencyTitleStack">
            <ImgIcon src={I + 'warning.png'} alt="Aviso" className="careWarningIcon" />
            <div>
              <b>REAÇÕES</b>
              <b>E DÚVIDAS</b>
            </div>
          </div>

          <p>
            Vermelhidão intensa, coceira exagerada, inchaço ou secreção não são normais.
            Em caso de qualquer reação ou dúvida, entre em contato com a gente.
          </p>
        </div>

      </div>
    </section>
  )
}

function CareShowcaseCard({ title, accent, items }) {
  const [firstWord, ...restWords] = title.split(' ');
  return (
    <div className={`careShowcaseCard ${accent}`}>
      <div className="careShowcaseHeader">
        <h3>{firstWord} <span>{restWords.join(' ')}</span></h3>
      </div>
      <div className="careShowcaseList">
        {items.map((item) => (
          <div className="careShowcaseItem" key={item.title}>
            <span className="careShowcaseIcon">
              <ImgIcon src={item.icon} alt="" />
            </span>
            <div>
              <b>{item.title}</b>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Depoimentos(){
 const deps = [
  {name:"Marina S.", text:"Fiz minha primeira tattoo anime e fui muito bem orientada. O atendimento foi calmo, o traço ficou limpo e recebi todos os cuidados por escrito.", tag:"Anime", img:"pieces/blackwork_only.png"},
  {name:"Lucas K.", text:"Levei uma ideia de game e o estúdio transformou em uma arte autoral. Gostei do orçamento pelo WhatsApp e da organização do horário.", tag:"Games", img:"pieces/gamer_only.png"},
  {name:"Rafael T.", text:"Procurei um tatuador geek em São Gonçalo para blackwork e encontrei um trabalho bem profissional. Recomendo demais.", tag:"Blackwork", img:"pieces/guts_only.png"},
  {name:"Amanda L.", text:"A tattoo colorida ficou com uma presença absurda. A equipe explicou sobre cicatrização, sinal, retoque e cuidados pós-tattoo.", tag:"Colorida", img:"pieces/colorida_only.png"}
 ];
 return (
  <section id="depoimentos" className="section testimonials">
    <SectionTitle tag="DEPOIMENTOS" title="O que nossos" highlight="clientes dizem.">
      Experiências de quem buscou tatuagem geek em São Gonçalo, tattoo anime RJ, blackwork, coloridas e artes autorais.
    </SectionTitle>
    <div className="testGrid">{deps.map((d)=><div className="testimonial" key={d.name}><div className="avatar"><img src={A+d.img} loading="lazy" alt={`Depoimento ${d.name}`} /></div><h3>{d.name}</h3><div className="stars">★★★★★</div><p>“{d.text}”</p><span>{d.tag}</span></div>)}</div>
    <CTA text="Pronto para eternizar sua história?" btn="Quero fazer minha tattoo" href="#orcamento"/>
  </section>
 )
}


function FAQ(){
 const faqs = [["Tatuagem dói?","A dor varia de pessoa para pessoa e da área do corpo tatuada. Nossos artistas trabalham para tornar o processo o mais confortável possível."],["Como é o processo de cicatrização?","Normalmente leva de 7 a 15 dias para cicatrização inicial, seguindo os cuidados indicados."],["Como funciona o orçamento?","Você envia sua ideia, referências, tamanho e local do corpo. A equipe analisa e retorna pelo WhatsApp."],["Qual a idade mínima para tatuar?","O atendimento segue as regras do estúdio e a legislação aplicável. Menores precisam de responsável legal e autorização quando permitido."],["Quanto tempo leva uma sessão?","Depende do tamanho, complexidade e estilo da arte. Informamos na etapa de orçamento."],["Quais cuidados após tatuar?","Lavar com cuidado, hidratar conforme orientação, evitar sol, piscina, praia e não arrancar casquinhas. Baixe o PDF de cuidados na seção Cuidados."], ["Precisa pagar sinal?","Para reservar horário, o estúdio pode solicitar sinal. A confirmação e regras de remarcação são enviadas pelo WhatsApp."]];
 const [open,setOpen]=useState(0);
 return (
  <section id="faq" className="section faq">
    <div className="faqLeft"><Tag icon={MessageCircle}>FAQ</Tag><h2>Dúvidas <span>Frequentes</span></h2><p>Respostas para as perguntas mais comuns sobre tatuagens, cuidados e atendimento.</p><div className="help"><MessageCircle/><b>Fale com a gente pelo WhatsApp</b><a className="btn primary" href="#contato">Chamar no WhatsApp</a></div></div>
    <div className="faqList">{faqs.map((f,i)=><div className="faqItem" key={f[0]}><button onClick={()=>setOpen(open===i?null:i)}><Flame/>{f[0]}{open===i?<ChevronUp/>:<ChevronDown/>}</button>{open===i&&<p>{f[1]}</p>}</div>)}</div>
  </section>
 )
}

function Contato(){
  const contactCards = [
    {
      icon: I + "whatsapp.png",
      title: "WhatsApp",
      subtitle: "Fale conosco agora",
      lines: [],
      href: STUDIO_INFO.whatsappUrl,
      linkLabel: STUDIO_INFO.whatsappDisplay
    },
    {
      icon: I + "instagram.png",
      title: "Instagram",
      subtitle: "Acompanhe nosso trabalho",
      lines: [],
      href: STUDIO_INFO.instagramUrl,
      linkLabel: STUDIO_INFO.instagram
    },
    {
      icon: I + "map-pin.png",
      title: "Endereço",
      subtitle: "Venha nos visitar",
      lines: ["Trindade, São Gonçalo - RJ"],
      href: GOOGLE_MAPS_OPEN_URL,
      linkLabel: "Abrir no Maps"
    },
    {
      icon: I + "clock.png",
      title: "Horário de Atendimento",
      subtitle: "Atendimento com hora marcada",
      schedule: [
        ["Segunda a Sexta", "11h às 20h"],
        ["Sábado", "10h às 18h"]
      ]
    }
  ];

  return (
    <section id="contato" className="section contact contactReferenceSection">
      <div className="contactReferenceGrid">
        <div className="contactReferenceLeft">
          <Tag icon={MapPin}>CONTATO E LOCALIZAÇÃO</Tag>

          <div className="contactReferenceTitleRow">
            <div className="contactReferenceTitleWrap">
              <h2>
                Vamos transformar
                <span>sua ideia <em>em arte.</em></span>
              </h2>
              <span className="contactReferenceUnderline" />
            </div>

          </div>

          <p className="contactReferenceLead">
            Entre em contato com a Soul Tattoo Geek e tire suas dúvidas.
            Estamos prontos para criar uma tattoo única e cheia de significado.
          </p>

          <div className="contactReferenceCards">
            {contactCards.map((item) => (
              <ContactReferenceCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="contactReferenceMapWrap">
          <div className="contactReferenceMapChrome" />
          <div className="map realMap contactReferenceMap">
            <iframe
              title="Localização Soul Tattoo Geek no Google Maps"
              src={GOOGLE_MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="contactMapPin" aria-hidden="true">
              <ImgIcon src={I + 'location-glow.png'} alt="" className="contactMapPinIcon" />
            </div>
            <div className="contactReferenceMapCard">
              <img src={A + 'logo-oficial.png'} alt="Soul Tattoo Geek" loading="lazy" />
              <div>
                <b>{STUDIO_INFO.name}</b>
                <span>Trindade, São Gonçalo - RJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contactReferenceCta">
        <div className="contactReferenceCtaInfo">
          <img src={A + 'logo-oficial.png'} alt="Soul Tattoo Geek" loading="lazy" />
          <div>
            <b>Pronto para eternizar sua ideia?</b>
            <p>Fale com a Soul Tattoo Geek e dê o primeiro passo para sua próxima tattoo épica.</p>
          </div>
        </div>

        <a className="btn primary contactReferenceCtaButton" href={STUDIO_INFO.whatsappUrl} target="_blank" rel="noreferrer">
          <ImgIcon src={I + 'whatsapp.png'} className="buttonImgIcon" alt="WhatsApp" />
          Fale com a Soul Tattoo Geek
          <ImgIcon src={I + 'arrow-right.png'} className="buttonImgIcon" alt="" />
        </a>
      </div>
    </section>
  )
}

function ContactReferenceCard({ icon, title, subtitle, lines = [], href, linkLabel, schedule }) {
  return (
    <div className="contactReferenceCard">
      <div className="contactReferenceCardIconWrap">
        <ImgIcon src={icon} alt="" className="contactReferenceCardIcon" />
      </div>

      <div className="contactReferenceCardBody">
        <b>{title}</b>
        <small>{subtitle}</small>

        {schedule ? (
          <div className="contactReferenceSchedule">
            {schedule.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="contactReferenceLines">
            {lines.map((line) => <span key={line}>{line}</span>)}
          </div>
        )}

        {href && linkLabel && (
          <a href={href} target="_blank" rel="noreferrer" className="contactReferenceLink">
            {linkLabel}
            <ImgIcon src={I + 'arrow-right.png'} className="buttonImgIcon" alt="" />
          </a>
        )}
      </div>
    </div>
  )
}

function Footer(){
  return (
    <footer className="siteFooter studioFooterClean">
      <div className="studioFooterCleanInner">
        <a className="studioFooterLogo" href="#inicio" aria-label="Soul Tattoo Geek">
          <img src={A + 'logo-oficial.png'} alt="Soul Tattoo Geek" loading="lazy" />
        </a>

        <div className="studioFooterText">
          <b>Contato oficial do estúdio</b>
          <span>Use apenas os canais oficiais da Soul Tattoo Geek.</span>
        </div>

        <div className="studioFooterLinks">
          <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram da Soul Tattoo Geek">
            <ImgIcon src={I + 'instagram.png'} alt="Instagram" className="socialImgIcon" />
            <span>{STUDIO_INFO.instagram}</span>
          </a>
          <a href="mailto:contato@soultattoogeek.com" aria-label="E-mail da Soul Tattoo Geek">
            <Mail size={16} />
            <span>contato@soultattoogeek.com</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

function ErrorFallback() {
  return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#050507",color:"#fff",padding:"40px",textAlign:"center"}}>
      <div>
        <h1 style={{fontSize:"42px",margin:"0 0 12px"}}>Soul Tattoo Geek</h1>
        <p>O site carregou, mas algum recurso visual falhou. Recarregue a página ou limpe o cache do navegador.</p>
      </div>
    </div>
  )
}

export default function App(){
 useRevealAnimations();
 useEffect(() => {
   document.body.classList.add("site-loaded");
   return () => document.body.classList.remove("site-loaded");
 }, []);
 try {
   return <><Header/><main><Home/><Sobre/><Artista/><Estilos/><Portfolio/><Orcamento/><Cuidados/><Depoimentos/><FAQ/><Contato/></main><Footer/></>
 } catch (error) {
   console.error(error);
   return <ErrorFallback/>
 }
}
