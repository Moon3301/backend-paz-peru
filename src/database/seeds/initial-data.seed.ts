import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectSection } from 'src/projects/entities/project-section.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { DeliveredProject } from 'src/delivered-projects/entities/delivered-project.entity';
import { District } from 'src/districts/entities/district.entity';
import { CmsSetting } from 'src/cms-settings/entities/cms-setting.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'paz_user',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'paz_peru',
  entities: [Project, ProjectSection, Promotion, DeliveredProject, District, CmsSetting],
  synchronize: true,
  charset: 'utf8mb4',
});

const PROJECTS_DATA = [
  {
    slug: 'lima-15',
    name: 'Lima 15',
    district: 'miraflores',
    status: 'LANZAMIENTO',
    logoUrl: 'images/logos/projects/logo-lima-morado.svg',
    thumbnailUrl: '/images/projects/thumb-lima15-home.png',
    sperantProjectId: 27,
    sortOrder: 1,
    sections: {
      hero: {
        logo: 'images/logos/projects/logo-lima.webp',
        projectName: 'Lima 15',
        district: 'DEPARTAMENTOS EN MIRAFLORES',
        description: 'TU DEPA DE 2 AMBIENTES CON PRECIO DESDE:',
        priceFrom: 'S/ 678,000*',
        overlayColor: 'rgba(98, 62, 75, 0.75)',
        textColor: '#ffffff',
        descriptionStyle: { fontSize: 'clamp(0.6rem, 1.6vw, 1.2rem)', letterSpacing: '0.12em', fontWeight: '700' },
        priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' },
        priceFromStyle: { fontSize: 'clamp(1rem, 3.2vw, 2.5rem)', letterSpacing: '0.12em', fontWeight: '700' },
        badgeColor: '#CA995E', descriptionColor: '#f0dfc0', priceLabelColor: '#f0dfc0', priceFromColor: '#CA995E',
        textPosition: { bottom: '20%' },
        logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(39vh, 345px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(30vh, 200px)' } },
        slides: [{ image: 'images/projects/lima15/hero-1.webp', alt: 'Lima 15 - Fachada' }]
      },
      specs: {
        stats: { backgroundColor: '#CA995E', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/lima15/icons/departamento.svg', label: 'Desde 81 m2 hasta 199 m2' }, location: { icon: 'images/projects/lima15/icons/ubicacion.svg', label: 'Ca. Gral. Borgoño 240, Miraflores' }, commonAreasLabel: { icon: 'images/projects/lima15/icons/zona-de-parrilla.svg', label: 'Para disfrutar todos los días' } },
        specs: { interiorImage: 'images/projects/lima15/specs/interior.png', projectName: 'Lima 15', projectSubtitle: 'DEPARTAMENTOS EN MIRAFLORES', amenityIcons: [{ icon: 'svg/icons/lobby.svg', label: 'Lobby' }, { icon: 'svg/icons/gym.svg', label: 'Gimnasio' }, { icon: 'svg/icons/meeting-room.svg', label: 'Sala de reuniones' }, { icon: 'svg/icons/coworking.svg', label: 'Coworking' }], floors: '11 pisos + Azotea', unitTypes: 'Flats y duplex de 2 y 3 ambientes', areaRange: 'Desde 81 m2 hasta 199 m2', logo: 'images/logos/projects/logo-lima-morado.svg', brochureUrl: 'docs/brochures/lima-15.pdf', videoUrl: 'https://www.youtube.com/embed/lvL6jsWh79s' }
      },
      amenities: { backgroundColor: '#52273b', items: [{ icon: 'images/projects/lima15/icons/lobby.svg', label: 'LOBBY' }, { icon: 'images/projects/lima15/icons/gimnasio.svg', label: 'GIMNASIO' }, { icon: 'images/projects/lima15/icons/sala-bar.svg', label: 'SALA DE REUNIONES' }, { icon: 'images/projects/lima15/icons/coworking.svg', label: 'COWORKING' }, { icon: 'images/projects/lima15/icons/zona-de-parrilla.svg', label: 'ZONA DE PARRILLA' }, { icon: 'images/projects/lima15/icons/piscina.svg', label: 'PISCINA' }, { icon: 'images/projects/lima15/icons/patio-interno.svg', label: 'PATIO INTERNO' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/lima15/gallery/comunes/1.webp' }, { src: 'images/projects/lima15/gallery/comunes/2.webp' }, { src: 'images/projects/lima15/gallery/comunes/3.webp' }, { src: 'images/projects/lima15/gallery/comunes/4.webp' }, { src: 'images/projects/lima15/gallery/comunes/5.webp' }, { src: 'images/projects/lima15/gallery/comunes/6.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/lima15/gallery/exteriores/1.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/lima15/gallery/interiores/1.webp' }, { src: 'images/projects/lima15/gallery/interiores/2.webp' }, { src: 'images/projects/lima15/gallery/interiores/3.webp' }, { src: 'images/projects/lima15/gallery/interiores/4.webp' }, { src: 'images/projects/lima15/gallery/interiores/5.webp' }, { src: 'images/projects/lima15/gallery/interiores/6.webp' }] }] },
      quoter: { projectId: 27, projectName: 'LIMA 15' },
      video: { backgroundColor: '#8da096', textColor: '#FFFFFF', url: 'https://www.youtube.com/embed/WzLVR52J6xw', type: 'youtube', title: 'CONOCE PROYECTO LIMA 15', fallbackImage: 'images/projects/lima15/video-lima.webp' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/lima15/ac/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#52273b', textColor: '#FFFFFF' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.9221261625453!2d-77.03591522408877!3d-12.11748068812482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c817df310d77%3A0xffa929a1e359ca0f!2sCa.%20Gral.%20Borgo%C3%B1o%20240%2C%20Miraflores%2015074%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776206396575!5m2!1ses!2scl', address: 'Ca. Gral. Borgoño 240, Miraflores', backgroundColor: '#52273b', textColor: '#FFFFFF', mapsUrl: 'https://maps.google.com/?q=Ca.+Gral.+Borgo%C3%B1o+240,+Miraflores,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Ca+Gral+Borgo%C3%B1o+240+Miraflores+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Mireia Gutierrez', role: 'Ejecutiva de Ventas', phone: '908930387', photo: 'images/executives/mireia-gutierrez.webp' }, { name: 'Joel Pezo', role: 'Ejecutivo de Ventas', phone: '981495711', photo: 'images/executives/joel-pezo.webp' }] },
    }
  },
  {
    slug: 'riva',
    name: 'Riva',
    district: 'miraflores',
    status: 'LANZAMIENTO',
    logoUrl: 'images/logos/projects/logo-riva-1.png',
    thumbnailUrl: '/images/projects/thumb-riva-home.png',
    sperantProjectId: 14,
    sortOrder: 2,
    sections: {
      hero: { logo: 'images/logos/projects/logo-riva.webp', projectName: 'Riva', district: 'DEPARTAMENTOS EN MIRAFLORES', description: 'ULTIMO MES DE PREVENTA', priceLine1: 'TU DEPA DE 2 AMBIENTES CON PRECIO DESDE', priceFrom: 'S/ 630,000*', overlayColor: 'rgba(60, 90, 100, 0.75)', textColor: '#ffffff', badgeColor: '#997b4f', descriptionStyle: { fontSize: 'clamp(0.6rem, 1.8vw, 1.6rem)', letterSpacing: '0.12em', fontWeight: '700' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 3.4vw, 2.8rem)', letterSpacing: '0.12em', fontWeight: '700' }, descriptionColor: '#f0ebe0', priceLabelColor: '#d1cbb8', priceFromColor: '#c8a24a', textPosition: { bottom: '20%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(39vh, 345px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(30vh, 200px)' } }, slides: [{ image: 'images/projects/riva/1.webp', alt: 'Riva - Fachada' }, { image: 'images/projects/riva/2.webp', alt: 'Riva - Vista exterior' }] },
      specs: {
        stats: { backgroundColor: '#d1cbb8', areaRange: { icon: 'images/projects/riva/icons/departamentos.svg', label: 'Desde 60 m2 hasta 172 m2' }, location: { icon: 'images/projects/riva/icons/ubicacion.svg', label: "Calle Comandante O'Donovan 115, Miraflores" }, commonAreasLabel: { icon: 'images/projects/riva/icons/areas-comunes.svg', label: 'Para disfrutar todos los días' } },
        specs: { logo: 'images/logos/projects/logo-riva.webp', backgroundColor: '#343233', textColor: '#FFFFFF', interiorImage: 'images/projects/riva/specs/interior.png', projectName: 'Riva', projectSubtitle: 'DEPARTAMENTOS EN MIRAFLORES', brochureUrl: 'docs/brochures/riva.pdf', videoUrl: 'https://www.youtube.com/embed/q3BmBjGt-p8', amenityIcons: [{ icon: 'images/projects/riva/icons/pisos.svg', label: 'Pisos' }, { icon: 'images/projects/riva/icons/flats.svg', label: 'Tipo de unidad' }, { icon: 'images/projects/riva/icons/metrajes.svg', label: 'Metrajes' }], floors: '12 pisos + Azotea', unitTypes: 'Flats y Dúplex 2 y 3 ambientes.', areaRange: 'Desde 60 m2 hasta 172 m2' }
      },
      amenities: { backgroundColor: '#997b4f', items: [{ icon: 'images/projects/riva/icons/lobby.svg', label: 'LOBBY' }, { icon: 'images/projects/riva/icons/coworking.svg', label: 'COWORKING' }, { icon: 'images/projects/riva/icons/bike-zone.svg', label: 'BIKE ZONE' }, { icon: 'images/projects/riva/icons/piscina.svg', label: 'PISCINA' }, { icon: 'images/projects/riva/icons/parrilla.svg', label: 'PARRILLA' }, { icon: 'images/projects/riva/icons/sala-bar.svg', label: 'SALA BAR' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/riva/gallery/comunes/1.webp' }, { src: 'images/projects/riva/gallery/comunes/2.webp' }, { src: 'images/projects/riva/gallery/comunes/3.webp' }, { src: 'images/projects/riva/gallery/comunes/4.webp' }, { src: 'images/projects/riva/gallery/comunes/5.webp' }, { src: 'images/projects/riva/gallery/comunes/6.webp' }, { src: 'images/projects/riva/gallery/comunes/7.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/riva/gallery/exteriores/1.webp' }, { src: 'images/projects/riva/gallery/exteriores/2.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/riva/gallery/interiores/1.webp' }, { src: 'images/projects/riva/gallery/interiores/2.webp' }, { src: 'images/projects/riva/gallery/interiores/3.webp' }, { src: 'images/projects/riva/gallery/interiores/4.webp' }, { src: 'images/projects/riva/gallery/interiores/5.webp' }, { src: 'images/projects/riva/gallery/interiores/6.webp' }, { src: 'images/projects/riva/gallery/interiores/7.webp' }] }] },
      quoter: { projectId: 14, projectName: 'RIVA' },
      video: { url: 'https://www.youtube.com/embed/q3BmBjGt-p8', type: 'youtube', title: 'CONOCE PROYECTO RIVA', fallbackImage: 'images/projects/riva/video-riva.webp' },
      virtual_tour: { url: 'https://360.lumica3d.com/lumica3d/PAZ_DONOVAN/', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#997b4f', textColor: '#FFFFFF' },
      ubication: { backgroundColor: '#343233', textColor: '#FFFFFF', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.738553160752!2d-77.03511012408858!3d-12.130032588113282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c81fe37e8d35%3A0xc39b89f2587eecfa!2sC.%20Comandante%20O%20Donovan%20115%2C%20Miraflores%2015074%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776206526540!5m2!1ses!2scl', address: "Calle Comandante O'Donovan 115, Miraflores", mapsUrl: "https://maps.google.com/?q=Calle+Comandante+O%E2%80%99Donovan+115,+Miraflores,+Lima,+Per%C3%BA", wazeUrl: "https://waze.com/ul?q=Calle+Comandante+O%E2%80%99Donovan+115+Miraflores+Lima&navigate=yes" },
      executives: { executives: [{ name: 'Jesús Bello', role: 'Ejecutivo de Ventas', phone: '987952815', photo: 'images/executives/jesus-antonio-bello.webp' }, { name: 'Jorge Coha', role: 'Ejecutivo de Ventas', phone: '977804343', photo: 'images/executives/jorge-coha.webp' }] },
    }
  },
  {
    slug: 'central',
    name: 'Central',
    district: 'miraflores',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-central.png',
    thumbnailUrl: '/images/projects/thumb-central-home.png',
    sperantProjectId: 2,
    sortOrder: 3,
    sections: {
      hero: { logo: 'images/logos/projects/logo-central.webp', projectName: 'Central', district: 'DEPARTAMENTOS EN MIRAFLORES', badge: '¡ÚLTIMOS DEPAS!', description: 'TU DEPA DE 3 AMBIENTES CON PRECIO DESDE', priceFrom: 'S/ 764,000*', overlayColor: 'rgba(178, 140, 173, 0.5)', badgeStyle: { fontSize: 'clamp(0.75rem, 2.2vw, 2rem)', letterSpacing: '0.12em', fontWeight: '700' }, descriptionStyle: { fontSize: 'clamp(0.6rem, 1.6vw, 1.2rem)', letterSpacing: '0.12em', fontWeight: '700' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 4vw, 4rem)', letterSpacing: '0.12em', fontWeight: '700' }, textColor: '#161129', badgeColor: '#161129', descriptionColor: '#e20b40', priceLabelColor: '#161129', priceFromColor: '#161129', textPosition: { bottom: '15%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(39vh, 350px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(30vh, 200px)' } }, slides: [{ image: 'images/projects/central/hero-1.webp', alt: 'Central - Fachada' }, { image: 'images/projects/central/hero-2.webp', alt: 'Central - Vista exterior' }] },
      specs: {
        stats: { backgroundColor: '#9dd3cf', sectionTitle: 'DESCUBRE CADA DETALLE DE ESTE GRAN PROYECTO EN MIRAFLORES', areaRange: { icon: 'images/projects/central/icons/depart.png', label: 'Desde 85m2 hasta 86m2' }, location: { icon: 'images/projects/central/icons/map.png', label: 'Av. Mariscal La Mar 1062 - Miraflores' }, commonAreasLabel: { icon: 'images/projects/central/icons/piscina.png', label: 'Para el máximo confort' } },
        specs: { interiorImage: 'images/projects/central/bar-central.jpg', projectName: 'Central', projectSubtitle: 'DEPARTAMENTOS EN MIRAFLORES', amenityIcons: [{ icon: 'svg/icons/lobby.svg', label: 'Lobby' }, { icon: 'svg/icons/gym.svg', label: 'Gimnasio' }, { icon: 'svg/icons/meeting-room.svg', label: 'Sala de reuniones' }, { icon: 'svg/icons/grill.svg', label: 'Zona de parrilla' }], floors: 'Flats y Dúplex', unitTypes: '3 Ambientes', areaRange: 'Desde 85m2 hasta 86m2', amenities: 'Coworking, gimnasio, lavandería, sala bar, área de parrillas, piscina con deck y estacionamiento de bicicletas.', logo: 'images/logos/projects/logo-central.png', brochureUrl: 'docs/brochures/central.pdf', videoUrl: 'https://www.youtube.com/embed/lvL6jsWh79s', backgroundColor: '#fab605', textColor: '#161129' }
      },
      amenities: { title: 'ESPACIOS QUE SE ADAPTAN A TI', backgroundColor: '#e8d4e3', textColor: '#161129', items: [{ icon: 'images/projects/central/icons/lobby.png', label: 'LOBBY' }, { icon: 'images/projects/central/icons/co-working.png', label: 'COWORKING' }, { icon: 'images/projects/central/icons/gimnasio.png', label: 'GIMNASIO' }, { icon: 'images/projects/central/icons/piscina.png', label: 'PISCINA' }, { icon: 'images/projects/central/icons/zona-de-parrillas.png', label: 'ZONA DE PARRILLAS' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Central tiene áreas comunes para cualquier momento de tu día, un completo CoWorking, Gimnasio equipado, Área de parrillas para tus fines de semana y una piscina con deck para los momentos de relajo.', images: [{ src: 'images/projects/central/gallery/comunes/1.png' }, { src: 'images/projects/central/gallery/comunes/2.png' }, { src: 'images/projects/central/gallery/comunes/3.png' }, { src: 'images/projects/central/gallery/comunes/4.png' }, { src: 'images/projects/central/gallery/comunes/5.png' }, { src: 'images/projects/central/gallery/comunes/6.png' }, { src: 'images/projects/central/gallery/comunes/7.png' }, { src: 'images/projects/central/gallery/comunes/8.png' }] }, { label: 'Exteriores', subtitle: 'Modernos, acogedores, cómodos y multifuncionales.', images: [{ src: 'images/projects/central/gallery/exteriores/1.webp' }, { src: 'images/projects/central/gallery/exteriores/2.webp' }, { src: 'images/projects/central/gallery/exteriores/3.webp' }] }, { label: 'Interiores', subtitle: 'Una fachada con estilo, todo lo que necesita la Av. La Mar.', images: [{ src: 'images/projects/central/gallery/interiores/1.png' }, { src: 'images/projects/central/gallery/interiores/2.png' }, { src: 'images/projects/central/gallery/interiores/3.png' }, { src: 'images/projects/central/gallery/interiores/4.png' }, { src: 'images/projects/central/gallery/interiores/5.png' }, { src: 'images/projects/central/gallery/interiores/6.png' }, { src: 'images/projects/central/gallery/interiores/7.png' }] }] },
      quoter: { projectId: 2, projectName: 'CENTRAL' },
      video: { backgroundColor: '#e8d4e3', textColor: '#161129', url: 'https://www.youtube.com/embed/lvL6jsWh79s', type: 'youtube', title: 'CONOCE PROYECTO CENTRAL', fallbackImage: 'images/projects/central/video-central.webp' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/central/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#e8d4e3', textColor: '#161129' },
      ubication: { image: 'images/projects/central/mapa-central1.webp', address: 'Av. Mariscal La Mar 1062 - Miraflores', projectTitle: 'UBICACIÓN DEL PROYECTO', backgroundColor: '#e8d4e3', mapsUrl: 'https://maps.google.com/?q=Av.+Mariscal+La+Mar+1062,+Miraflores,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Av+Mariscal+La+Mar+1062+Miraflores+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Maryuri Huamani', role: 'Ejecutiva de Ventas', phone: '969334619', photo: '/images/executives/maryuri-huamani.webp' }, { name: 'Karen Minaya', role: 'Ejecutiva de Ventas', phone: '981287582', photo: '/images/executives/karen-minaya.webp' }] },
    }
  },
  {
    slug: 'taller',
    name: 'Taller',
    district: 'miraflores',
    status: 'EN CONSTRUCCIÓN',
    logoUrl: 'images/logos/projects/logo-taller.png',
    thumbnailUrl: '/images/projects/thumb-taller.png',
    sperantProjectId: 12,
    sortOrder: 4,
    sections: {
      hero: { logo: 'images/logos/projects/logo-taller.webp', projectName: 'Taller', district: 'DEPARTAMENTOS EN MIRAFLORES', description: 'ENTREGA SEPTIEMBRE 2026', priceLine1: 'TU DEPA DE 1 AMBIENTE CON PRECIO DESDE', priceFrom: 'S/ 554,000*', overlayColor: 'rgba(60, 40, 30, 0.75)', textColor: '#ffffff', descriptionStyle: { fontSize: 'clamp(0.6rem, 1.8vw, 1.6rem)', letterSpacing: '0.12em', fontWeight: '700', marginBottom: 'clamp(8px, 2vw, 35px)' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 3.4vw, 2.8rem)', letterSpacing: '0.12em', fontWeight: '700' }, badgeColor: '#c2304f', descriptionColor: '#c2304f', priceLabelColor: '#c2304f', priceFromColor: '#c2304f', textPosition: { bottom: '30%', left: '30%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(40vh, 355px)' }, mobile: { width: 'min(72vw, 270px)', height: 'min(32vh, 210px)' } }, slides: [{ image: 'images/projects/taller/banner-1.webp', alt: 'Taller - Fachada' }, { image: 'images/projects/taller/banner-2.webp', alt: 'Taller - Vista exterior' }, { image: 'images/projects/taller/banner-3.webp', alt: 'Taller - Vista exterior' }] },
      specs: {
        stats: { sectionTitle: 'TU HOGAR EN EL CORAZÓN DE LA CIUDAD', backgroundColor: '#800133', textColor: '#FFFFFF', areaRange: { icon: 'svg/icons/area.svg', label: 'Desde 47 m2 hasta 122 m2' }, location: { icon: 'svg/icons/location.svg', label: 'Toribio Polo 450, Miraflores' }, commonAreasLabel: { icon: 'svg/icons/common-areas.svg', label: 'Para disfrutar todos los días' } },
        specs: { logo: 'images/logos/projects/logo-taller-text.png', interiorImage: 'images/projects/taller/specs/interior.jpg', projectName: 'Taller', projectSubtitle: 'DEPARTAMENTOS EN MIRAFLORES', brochureUrl: 'docs/brochures/taller.pdf', amenityIcons: [{ icon: 'svg/icons/lobby.svg', label: 'Lobby' }, { icon: 'svg/icons/gym.svg', label: 'Gimnasio' }, { icon: 'svg/icons/meeting-room.svg', label: 'Sala de reuniones' }, { icon: 'svg/icons/grill.svg', label: 'Zona de parrilla' }], floors: '13 pisos + azotea', unitTypes: 'Flats y Dúplex 1, 2 y 3 ambientes', areaRange: 'Desde 47 m2 hasta 122 m2', backgroundColor: '#afcdc1', textColor: '#161129' }
      },
      amenities: { backgroundColor: '#ece8dc', textColor: '#161129', items: [{ icon: 'images/projects/taller/icons/ico-lobby.png', label: 'LOBBY' }, { icon: 'images/projects/taller/icons/ico-parrillas.png', label: 'AREA DE PARRILLAS' }, { icon: 'images/projects/taller/icons/ico-piscina.png', label: 'PISCINA' }, { icon: 'images/projects/taller/icons/ico-gimnasio.png', label: 'GIMNASIO' }, { icon: 'images/projects/taller/icons/ico-pet-zone.png', label: 'PET ZONE' }, { icon: 'images/projects/taller/icons/ico-coworking.png', label: 'COWORKING' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/taller/gallery/comunes/1.webp' }, { src: 'images/projects/taller/gallery/comunes/2.webp' }, { src: 'images/projects/taller/gallery/comunes/3.webp' }, { src: 'images/projects/taller/gallery/comunes/4.webp' }, { src: 'images/projects/taller/gallery/comunes/5.webp' }, { src: 'images/projects/taller/gallery/comunes/6.webp' }, { src: 'images/projects/taller/gallery/comunes/7.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/taller/gallery/exteriores/1.webp' }, { src: 'images/projects/taller/gallery/exteriores/2.webp' }, { src: 'images/projects/taller/gallery/exteriores/3.webp' }, { src: 'images/projects/taller/gallery/exteriores/4.webp' }, { src: 'images/projects/taller/gallery/exteriores/5.webp' }, { src: 'images/projects/taller/gallery/exteriores/6.webp' }, { src: 'images/projects/taller/gallery/exteriores/7.webp' }, { src: 'images/projects/taller/gallery/exteriores/8.webp' }, ] }, { label: 'Interiores', images: [{ src: 'images/projects/taller/gallery/interiores/1.webp' }, { src: 'images/projects/taller/gallery/interiores/2.webp' }, { src: 'images/projects/taller/gallery/interiores/3.webp' }, { src: 'images/projects/taller/gallery/interiores/4.webp' }, { src: 'images/projects/taller/gallery/interiores/5.webp' }, { src: 'images/projects/taller/gallery/interiores/6.webp' }, { src: 'images/projects/taller/gallery/interiores/7.webp' }, { src: 'images/projects/taller/gallery/interiores/8.webp' }] }] },
      quoter: { projectId: 12, projectName: 'TALLER' },
      video: { backgroundColor: '#ece8dc', textColor: '#161129', url: 'https://www.youtube.com/embed/35BMHYaqVHg', type: 'youtube', title: 'CONOCE PROYECTO TALLER', fallbackImage: 'images/projects/taller/video-taller.webp' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/taller/index.htm', projectTitle: 'CONOCE PROYECTO TALLER', backgroundColor: '#ece8dc', textColor: '#161129' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.9888828479448!2d-77.04916432408885!3d-12.11291298812904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8373e3711ef%3A0x1b56a055bf7da94b!2sCa.%20Jos%C3%A9%20Toribio%20Polo%20450%2C%20Lima%2015074%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776206870503!5m2!1ses!2scl', address: 'Ca. José Toribio Polo 450, Miraflores', backgroundColor: '#ece8dc', textColor: '#161129', mapsUrl: 'https://maps.google.com/?q=Ca.+Jos%C3%A9+Toribio+Polo+450,+Miraflores,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Ca+Jos%C3%A9+Toribio+Polo+450+Miraflores+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Aracelly Quispe', role: 'Ejecutiva de Ventas', phone: '986651320', photo: 'images/executives/aracelly-quispe.webp' }, { name: 'Josselyn Candelario', role: 'Ejecutiva de Ventas', phone: '934872230', photo: 'images/executives/josselyn-candelario.webp' }] },
    }
  },
  {
    slug: 'marena',
    name: 'Marena',
    district: 'san-miguel',
    status: 'LANZAMIENTO',
    logoUrl: 'images/logos/projects/logo-marena-1.svg',
    thumbnailUrl: '/images/projects/thumb-marena-home.png',
    sperantProjectId: 28,
    sortOrder: 5,
    sections: {
      hero: { logo: 'images/logos/projects/logo-marena.webp', projectName: 'Marena', district: 'DEPARTAMENTOS EN SAN MIGUEL', description: 'LANZAMIENTO', priceLine1: 'DESCUENTOS HASTA', priceFrom: 'S/ 120,000*', overlayColor: 'rgba(30, 80, 120, 0.75)', textColor: '#ffffff', badgeColor: '#ffffff', descriptionStyle: { fontSize: 'clamp(0.65rem, 2.2vw, 2.2rem)', letterSpacing: '0.12em', fontWeight: '700' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 3.4vw, 2.8rem)', letterSpacing: '0.12em', fontWeight: '700' }, descriptionColor: '#ffffff', priceLabelColor: '#ffffff', priceFromColor: '#ffffff', textPosition: { bottom: '25%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(39vh, 345px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(30vh, 200px)' } }, slides: [{ image: 'images/projects/marena/1.webp', alt: 'Marena - Fachada' }, { image: 'images/projects/marena/2.webp', alt: 'Marena - Vista exterior' }] },
      specs: {
        stats: { backgroundColor: '#f7eddf', textColor: '#0d509f', sectionTitle: 'Vive distinto, vive en Marena, vive en San Miguel', areaRange: { icon: 'images/projects/marena/icons/areas.svg', label: 'Desde 40 m2 hasta 155 m2' }, location: { icon: 'images/projects/marena/icons/ubicacion.svg', label: 'Jirón Federico Gallese 399, San Miguel' }, commonAreasLabel: { icon: 'images/projects/marena/icons/departamentos.svg', label: 'Para tu nuevo estilo de vida' } },
        specs: { logo: 'images/logos/projects/logo-marena-1.svg', description: 'Marena redefine la vida en San Miguel con una propuesta moderna, frente al Parque Bertolotto y a pasos del malecón.', backgroundColor: '#e7573f', textColor: '#FFFFFF', interiorImage: 'images/projects/marena/specs/interior.png', projectName: 'Marena', projectSubtitle: 'DEPARTAMENTOS EN SAN MIGUEL', videoUrl: 'https://www.youtube.com/embed/lvL6jsWh79s', brochureUrl: 'docs/brochures/marena.pdf', amenityIcons: [], floors: '17 pisos + Azotea.', unitTypes: 'Flats y Dúplex 1, 2 y 3 ambientes.', areaRange: 'Desde 40 m2 hasta 155 m2.' }
      },
      amenities: { backgroundColor: '#4eafc6', title: 'Modernas áreas comunes', items: [{ icon: 'images/projects/marena/icons/lobby.svg', label: 'LOBBY' }, { icon: 'images/projects/marena/icons/coworking.svg', label: 'COWORKING' }, { icon: 'images/projects/marena/icons/gimnasio.svg', label: 'GIMNASIO' }, { icon: 'images/projects/marena/icons/piscina.svg', label: 'PISCINA' }, { icon: 'images/projects/marena/icons/zona-de-parrilla.svg', label: 'ZONA DE PARRILLA' }, { icon: 'images/projects/marena/icons/sala-bar.svg', label: 'SALA BAR' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/marena/gallery/comunes/1.webp' }, { src: 'images/projects/marena/gallery/comunes/2.webp' }, { src: 'images/projects/marena/gallery/comunes/3.webp' }, { src: 'images/projects/marena/gallery/comunes/4.webp' }, { src: 'images/projects/marena/gallery/comunes/5.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/marena/gallery/exteriores/1.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/marena/gallery/interiores/1.webp' }, { src: 'images/projects/marena/gallery/interiores/2.webp' }, { src: 'images/projects/marena/gallery/interiores/3.webp' }, { src: 'images/projects/marena/gallery/interiores/4.webp' }, { src: 'images/projects/marena/gallery/interiores/5.webp' }, { src: 'images/projects/marena/gallery/interiores/6.webp' }, { src: 'images/projects/marena/gallery/interiores/7.webp' }] }] },
      quoter: { projectId: 28, projectName: 'MARENA' },
      video: { backgroundColor: '#2d5066', textColor: '#FFFFFF', url: 'https://www.youtube.com/embed/uZ1Hy4yBmIM', type: 'youtube', title: 'CONOCE PROYECTO MARENA', fallbackImage: 'images/projects/marena/1.webp' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/marena/ac/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#2d5066', textColor: '#dcd0c9' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.2799138360874!2d-77.08243072408902!3d-12.092979888147434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c99f58c90f65%3A0x63a293fae2330a69!2sJr.%20Federico%20Gallese%20Taricchi%20399%2C%20Lima%2015086%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776207120267!5m2!1ses!2scl', address: 'Jirón Federico Gallese 399, San Miguel', backgroundColor: '#4eafc6', textColor: '#FFFFFF', mapsUrl: 'https://maps.google.com/?q=Jr.+Federico+Gallese+Taricchi+399,+San+Miguel,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Jr+Federico+Gallese+Taricchi+399+San+Miguel+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Carla Celi', role: 'Ejecutiva de Ventas', phone: '981520744', photo: 'images/executives/carla-celi.webp' }, { name: 'Maria Rodriguez', role: 'Ejecutiva de Ventas', phone: '924902474', photo: 'images/executives/maria-del-carmen-rodriguez.webp' }] },
    }
  },
  {
    slug: 'serena',
    name: 'Serena',
    district: 'san-miguel',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-serena.png',
    thumbnailUrl: '/images/projects/thumb-serena.jpg',
    sperantProjectId: 11,
    sortOrder: 6,
    sections: {
      hero: { logo: 'images/logos/projects/logo-serena.webp', projectName: 'Serena', district: 'DEPARTAMENTOS EN SAN MIGUEL', description: 'ENTREGA INMEDIATA', descriptionStyle: { fontSize: 'clamp(0.65rem, 2vw, 2rem)', letterSpacing: '0.12em', fontWeight: '700' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 2.8vw, 2.2rem)', fontWeight: '800' }, priceLine1: 'TU DEPA DE 2 AMBIENTE CON PRECIO DESDE', priceFrom: 'S/ 439,000*', overlayColor: 'rgba(90, 110, 90, 0.75)', textColor: '#ffffff', badgeColor: '#ffd6d4', descriptionColor: '#ffd6d4', priceLabelColor: '#ffd6d4', priceFromColor: '#ffd6d4', textPosition: { bottom: '35%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(46vh, 460px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(49vh, 560px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(42vh, 370px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(32vh, 210px)' } }, slides: [{ image: 'images/projects/serena/1.webp', alt: 'Serena - Fachada' }, { image: 'images/projects/serena/2.webp', alt: 'Serena - Vista exterior' }, { image: 'images/projects/serena/3.webp', alt: 'Serena - Vista exterior' }] },
      specs: {
        stats: { backgroundColor: '#ec615b', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/serena/icons/departamentos.svg', label: 'Desde 56m2 hasta 121 m2' }, location: { icon: 'images/projects/serena/icons/ubicacion.svg', label: 'Av. Bertolotto 390 - San Miguel' }, commonAreasLabel: { icon: 'images/projects/serena/icons/areas-comunes.svg', label: 'Para disfrutar todos los días' } },
        specs: { logo: 'images/logos/projects/logo-serena-1.webp', backgroundColor: '#256ab2', textColor: '#FFFFFF', interiorImage: 'images/projects/serena/specs/interior.jpg', projectName: 'Serena', projectSubtitle: 'DEPARTAMENTOS EN SAN MIGUEL', brochureUrl: 'docs/brochures/serena.pdf', videoUrl: 'https://www.youtube.com/embed/CHby76_dqbI', amenityIcons: [{ icon: 'images/projects/serena/icons/lobby.svg', label: 'Lobby' }, { icon: 'images/projects/serena/icons/gimnasio.svg', label: 'Gimnasio' }, { icon: 'images/projects/serena/icons/area-parrillas.svg', label: 'Zona de parrilla' }, { icon: 'images/projects/serena/icons/coworking.svg', label: 'Coworking' }], floors: '17 pisos + Azotea', unitTypes: 'Flats y Duplex 2 y 3 ambientes.', areaRange: 'Desde 56m2 hasta 121 m2' }
      },
      amenities: { backgroundColor: '#ec615b', textColor: '#FFFFFF', items: [{ icon: 'images/projects/serena/icons/lobby.svg', label: 'LOBBY' }, { icon: 'images/projects/serena/icons/jardin-interno.svg', label: 'JARDIN INTERNO' }, { icon: 'images/projects/serena/icons/kids-room.svg', label: 'KIDS ROOM' }, { icon: 'images/projects/serena/icons/sala-bar.svg', label: 'SALA BAR' }, { icon: 'images/projects/serena/icons/gimnasio.svg', label: 'GIMNASIO' }, { icon: 'images/projects/serena/icons/area-parrillas.svg', label: 'AREAS DE PARRILLAS' }, { icon: 'images/projects/serena/icons/piscina.svg', label: 'PISCINA' }, { icon: 'images/projects/serena/icons/coworking.svg', label: 'COWORKING' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/serena/gallery/comunes/1.webp' }, { src: 'images/projects/serena/gallery/comunes/2.webp' }, { src: 'images/projects/serena/gallery/comunes/3.webp' }, { src: 'images/projects/serena/gallery/comunes/4.webp' }, { src: 'images/projects/serena/gallery/comunes/5.webp' }, { src: 'images/projects/serena/gallery/comunes/6.webp' }, { src: 'images/projects/serena/gallery/comunes/7.webp' }, { src: 'images/projects/serena/gallery/comunes/8.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/serena/gallery/exteriores/1.webp' }, { src: 'images/projects/serena/gallery/exteriores/2.webp' }, { src: 'images/projects/serena/gallery/exteriores/3.webp' }, { src: 'images/projects/serena/gallery/exteriores/4.webp' }, { src: 'images/projects/serena/gallery/exteriores/5.webp' } ] }, { label: 'Interiores', images: [{ src: 'images/projects/serena/gallery/interiores/1.webp' }, { src: 'images/projects/serena/gallery/interiores/2.webp' }, { src: 'images/projects/serena/gallery/interiores/3.webp' }, { src: 'images/projects/serena/gallery/interiores/4.webp' }, { src: 'images/projects/serena/gallery/interiores/5.webp' }, { src: 'images/projects/serena/gallery/interiores/6.webp' }] }] },
      quoter: { projectId: 11, projectName: 'SERENA' },
      video: { backgroundColor: '#ec615b', textColor: '#FFFFFF', url: 'https://www.youtube.com/embed/CHby76_dqbI', type: 'youtube', title: 'CONOCE PROYECTO SERENA', fallbackImage: 'images/projects/serena/video-serena.webp' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.2799138360874!2d-77.08243072408902!3d-12.092979888147434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9596680071b%3A0xdb6ffe63c669d7a7!2sSerena%20-%20Paz%20Inmobiliaria!5e0!3m2!1ses!2scl!4v1776207060702!5m2!1ses!2scl', address: 'Av. Bertolotto esquina Jirón Sucre Nros. 120-130 San Miguel', backgroundColor: '#ec615b', textColor: '#FFFFFF', mapsUrl: 'https://maps.google.com/?q=Av.+Bertolotto+esquina+Jir%C3%B3n+Sucre+Nros.+120-130,+San+Miguel,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Av+Bertolotto+esquina+Jir%C3%B3n+Sucre+Nros+120-130+San+Miguel+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Carla Celi', role: 'Ejecutiva de Ventas', phone: '981520744', photo: 'images/executives/carla-celi.webp' }, { name: 'Maria Rodriguez', role: 'Ejecutiva de Ventas', phone: '924902474', photo: 'images/executives/maria-del-carmen-rodriguez.webp' }] },
    }
  },
  {
    slug: 'patio-la-paz',
    name: 'Patio La Paz',
    district: 'san-miguel',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-patio.png',
    thumbnailUrl: '/images/projects/thumb-patio-home.jpg',
    sperantProjectId: 8,
    sortOrder: 7,
    sections: {
      hero: { logo: 'images/logos/projects/logo-patio-la-paz.webp', projectName: 'Patio La Paz', district: 'DEPARTAMENTOS EN SAN MIGUEL', description: 'ENTREGA INMEDIATA', priceLine1: 'TU DEPA DE 2 AMBIENTE CON CUOTAS DESDE', priceFrom: 'S/ 2,633*', overlayColor: 'rgba(80, 70, 50, 0.75)', descriptionStyle: { fontSize: 'clamp(0.65rem, 2.2vw, 2.2rem)', letterSpacing: '0.12em', fontWeight: '700', marginTop: 'clamp(6px, 1.5vw, 20px)' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 3.4vw, 2.8rem)', fontWeight: '700' }, textColor: '#ffffff', badgeColor: '#fab605', descriptionColor: '#fff4cc', priceLabelColor: '#fff4cc', priceFromColor: '#fab605', textPosition: { bottom: '10%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(38vh, 340px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(28vh, 190px)' } }, slides: [{ image: 'images/projects/patio-la-paz/1.webp', alt: 'Patio La Paz - Fachada' }] },
      specs: {
        stats: { backgroundColor: '#231f20', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/patio-la-paz/icons/cuadrado.png', label: 'Desde 40m2 hasta 114m2' }, location: { icon: 'images/projects/patio-la-paz/icons/map.png', label: 'Av. La Paz 2551 San Miguel' }, commonAreasLabel: { icon: 'images/projects/patio-la-paz/icons/casita.png', label: 'Para disfrutar en familia' } },
        specs: { backgroundColor: '#fab605', textColor: '#231f20', logo: 'images/logos/projects/logo-patio-la-paz-1.png', interiorImage: 'images/projects/patio-la-paz/specs/interior.jpg', projectName: 'Patio La Paz', projectSubtitle: 'DEPARTAMENTOS EN SAN MIGUEL', brochureUrl: 'docs/brochures/patio-la-paz.pdf', videoUrl: 'https://www.youtube.com/embed/QD35i4dF5Ug', amenityIcons: [{ icon: 'svg/icons/lobby.svg', label: 'Lobby' }, { icon: 'svg/icons/gym.svg', label: 'Gimnasio' }, { icon: 'svg/icons/grill.svg', label: 'Zona de parrilla' }, { icon: 'svg/icons/meeting-room.svg', label: 'Sala de reuniones' }], floors: '12 pisos', unitTypes: '1, 2 y 3 dormitorios', areaRange: 'Desde 40 m2 hasta 114 m2' }
      },
      amenities: { backgroundColor: '#ffffff', textColor: '#231f20', items: [{ icon: 'images/projects/patio-la-paz/icons/lobbdy.png', label: 'LOBBY' }, { icon: 'images/projects/patio-la-paz/icons/sala.png', label: 'SALA DE NIÑOS' }, { icon: 'images/projects/patio-la-paz/icons/arbol.png', label: 'PATIO CENTRAL' }, { icon: 'images/projects/patio-la-paz/icons/piscina.png', label: 'PISCINA' }, { icon: 'images/projects/patio-la-paz/icons/zona.png', label: 'ZONA DE PARRILLAS' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/patio-la-paz/gallery/comunes/1.webp' }, { src: 'images/projects/patio-la-paz/gallery/comunes/2.webp' }, { src: 'images/projects/patio-la-paz/gallery/comunes/3.webp' }, { src: 'images/projects/patio-la-paz/gallery/comunes/4.webp' }, { src: 'images/projects/patio-la-paz/gallery/comunes/5.webp' }, { src: 'images/projects/patio-la-paz/gallery/comunes/6.webp' }, { src: 'images/projects/patio-la-paz/gallery/comunes/7.webp' }, { src: 'images/projects/patio-la-paz/gallery/comunes/8.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/patio-la-paz/gallery/exteriores/1.webp' }, { src: 'images/projects/patio-la-paz/gallery/exteriores/2.webp' }, { src: 'images/projects/patio-la-paz/gallery/exteriores/3.webp' }, { src: 'images/projects/patio-la-paz/gallery/exteriores/4.webp' }, { src: 'images/projects/patio-la-paz/gallery/exteriores/5.webp' }, { src: 'images/projects/patio-la-paz/gallery/exteriores/6.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/patio-la-paz/gallery/interiores/1.webp' }, { src: 'images/projects/patio-la-paz/gallery/interiores/2.webp' }, { src: 'images/projects/patio-la-paz/gallery/interiores/3.webp' }, { src: 'images/projects/patio-la-paz/gallery/interiores/4.webp' }, { src: 'images/projects/patio-la-paz/gallery/interiores/5.webp' }, { src: 'images/projects/patio-la-paz/gallery/interiores/6.webp' }] }] },
      quoter: { projectId: 8, projectName: 'Patio La Paz' },
      video: { backgroundColor: '#231f20', textColor: '#fab605', url: 'https://www.youtube.com/embed/QD35i4dF5Ug', type: 'youtube', title: 'CONOCE PROYECTO PATIO LA PAZ', fallbackImage: 'images/projects/patio-la-paz/video-patio.webp' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/patio/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#231f20', textColor: '#fab605' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.4729547058646!2d-77.10877732408919!3d-12.079740388159653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cbd711b0a51d%3A0x46a0bd7cfc7a04f9!2sAv.%20La%20Paz%202551%2C%20Lima%2015087%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776207213516!5m2!1ses!2scl', address: 'Av. La Paz 2551, San Miguel, Lima', backgroundColor: '#231f20', textColor: '#FFFFFF', mapsUrl: 'https://maps.google.com/?q=Av.+La+Paz+2551,+San+Miguel,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Av+La+Paz+2551+San+Miguel+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Grecia Taype', role: 'Ejecutiva de Ventas', phone: '947320843', photo: 'images/executives/grecia-taype.webp' }, { name: 'Lisset Guzman', role: 'Ejecutiva de Ventas', phone: '970114020', photo: 'images/executives/lisset-guzman.webp' }] },
    }
  },
  {
    slug: 'amalfi',
    name: 'Amalfi',
    district: 'san-miguel',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-amalfi.svg',
    thumbnailUrl: '/images/projects/thumb-amalfi-home.png',
    sperantProjectId: 1,
    sortOrder: 8,
    sections: {
      hero: { projectName: 'Amalfi', district: 'DEPARTAMENTOS EN SAN MIGUEL', description: 'ENTREGA INMEDIATA', priceLine1: 'Depas con precio desde:', priceFrom: 'S/ XXX,000*', overlayColor: 'rgba(150, 90, 30, 0.75)', textColor: '#ffffff', badgeColor: '#3e6d81', descriptionColor: '#dcd0c9', priceLabelColor: '#dcd0c9', priceFromColor: '#3e6d81', textPosition: { bottom: '10%' }, slides: [{ image: 'images/projects/amalfi/hero-1.webp', alt: 'Amalfi - Fachada' }, { image: 'images/projects/amalfi/hero-2.webp', alt: 'Amalfi - Vista exterior' }, { image: 'images/projects/amalfi/hero-3.webp', alt: 'Amalfi - Vista exterior' }] },
      specs: {
        stats: { backgroundColor: '#3e6d81', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/amalfi/icons/2.svg', label: 'Desde 49m2 hasta 104m2' }, location: { icon: 'images/projects/amalfi/icons/3.svg', label: 'Av. Costanera 2560, San Miguel' }, commonAreasLabel: { icon: 'images/projects/amalfi/icons/1.svg', label: 'Para toda la familia' } },
        specs: { logo: 'images/logos/projects/logo-amalfi-1.png', textColor: '#3e6d81', interiorImage: 'images/projects/amalfi/specs/interior.png', projectName: 'Amalfi', projectSubtitle: 'DEPARTAMENTOS EN SAN MIGUEL', brochureUrl: 'docs/brochures/amalfi.pdf', videoUrl: 'https://www.youtube.com/embed/UGpOIL-LkUc', amenityIcons: [{ icon: 'svg/icons/lobby.svg', label: 'Lobby' }, { icon: 'svg/icons/gym.svg', label: 'Gimnasio' }, { icon: 'svg/icons/grill.svg', label: 'Zona de parrilla' }, { icon: 'svg/icons/meeting-room.svg', label: 'Sala de reuniones' }], description: 'Condominio Amalfi redefine tu estilo de vida frente al mar, ofreciendo vistas privilegiadas y una experiencia tipo club.', floors: '17 pisos', unitTypes: '3 ambientes', areaRange: 'Desde: 49m2 Hasta: 104m2' }
      },
      amenities: { backgroundColor: '#dcd0c9', textColor: '#2d5066', items: [] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/amalfi/gallery/comunes/1.webp' }, { src: 'images/projects/amalfi/gallery/comunes/2.webp' }, { src: 'images/projects/amalfi/gallery/comunes/3.webp' }, { src: 'images/projects/amalfi/gallery/comunes/4.webp' }, { src: 'images/projects/amalfi/gallery/comunes/5.webp' }, { src: 'images/projects/amalfi/gallery/comunes/6.webp' }, { src: 'images/projects/amalfi/gallery/comunes/7.webp' }, { src: 'images/projects/amalfi/gallery/comunes/8.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/amalfi/gallery/exteriores/1.webp' }, { src: 'images/projects/amalfi/gallery/exteriores/2.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/amalfi/gallery/interiores/1.webp' }, { src: 'images/projects/amalfi/gallery/interiores/2.webp' }, { src: 'images/projects/amalfi/gallery/interiores/3.webp' }, { src: 'images/projects/amalfi/gallery/interiores/4.webp' }] }] },
      quoter: { projectId: 1, projectName: 'Amalfi' },
      video: { backgroundColor: '#2d5066', textColor: '#dcd0c9', url: 'https://www.youtube.com/embed/UGpOIL-LkUc', type: 'youtube', title: 'CONOCE PROYECTO AMALFI', fallbackImage: 'images/projects/amalfi/video-amalfi.webp' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/amalfi/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#2d5066', textColor: '#dcd0c9' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3901.455105341643!2d-77.10708393791298!3d-12.080965167273371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAv.%20Costanera%20cdra.25%2C%20San%20Miguel.!5e0!3m2!1ses!2scl!4v1776207349513!5m2!1ses!2scl', address: 'Av. Costanera 2560, San Miguel', backgroundColor: '#3e6d81', textColor: '#FFFFFF', mapsUrl: 'https://maps.google.com/?q=Av.+Costanera+cdra.25,+San+Miguel,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Av+Costanera+cdra.25+San+Miguel+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Carla Venegas', role: 'Ejecutiva de Ventas', phone: '977876984', photo: 'images/executives/carla-venegas.webp' }, { name: 'Marjourie Acosta', role: 'Ejecutiva de Ventas', phone: '983478905', photo: 'images/executives/marjourie-acosta.webp' }] },
    }
  },
  {
    slug: 'real',
    name: 'Real',
    district: 'la-victoria',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-real.svg',
    thumbnailUrl: '/images/projects/thumb-real-home.png',
    sperantProjectId: 9,
    sortOrder: 9,
    sections: {
      hero: { projectName: 'Real', district: 'DEPARTAMENTOS EN LA VICTORIA', description: 'ENTREGA INMEDIATA', priceLine1: 'Depas con precio desde:', priceFrom: 'S/ XXX,000*', overlayColor: 'rgba(90, 30, 30, 0.75)', textColor: '#ffffff', badgeColor: '#778b5c', descriptionColor: '#d8e0cc', priceLabelColor: '#d8e0cc', priceFromColor: '#778b5c', textPosition: { bottom: '10%' }, slides: [{ image: 'images/projects/real/logo-hero-1.webp', alt: 'Real - Fachada' }, { image: 'images/projects/real/logo-hero-2.webp', alt: 'Real - Vista exterior' }] },
      specs: {
        stats: { backgroundColor: '#778b5c', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/real/icons/icono-depto.svg', label: '1-2-3 Dormitorios' }, location: { icon: 'images/projects/real/icons/icono-metraje.svg', label: 'Desde: 33m2 Hasta: 72.3m2' }, commonAreasLabel: { icon: 'images/projects/real/icons/icono-pisos.png', label: '20 + 22 Pisos' } },
        specs: { logo: 'images/logos/projects/logo-real-1.png', description: 'Paz Inmobiliaria presenta Residencial Real, 2 modernas torres con todo lo que necesitas; la comodidad de una ubicación inmejorable con las mejores áreas comunes y acabados de primera.', backgroundColor: '#778b5c', videoUrl: 'https://www.youtube.com/embed/lvL6jsWh79s', brochureUrl: 'docs/brochures/real.pdf', textColor: '#FFFFFF', interiorImage: 'images/projects/real/specs/interior.png', projectName: 'Real', projectSubtitle: 'DEPARTAMENTOS EN LA VICTORIA', amenityIcons: [], floors: '20 + 22 Pisos', unitTypes: '1-2-3 Dormitorios', areaRange: 'Desde: 33m2 Hasta: 72.3m2' }
      },
      amenities: { backgroundColor: '#7a6c62', items: [{ icon: 'images/projects/real/icons/icono-salakids.svg', label: 'KIDS ROOM' }, { icon: 'images/projects/real/icons/icono-parrilla.svg', label: 'BBQ ZONE' }, { icon: 'images/projects/real/icons/icono-coworking.svg', label: 'COWORKING' }, { icon: 'images/projects/real/icons/icono-piscina.svg', label: 'PISCINA' }, { icon: 'images/projects/real/icons/icono-gimnasio.svg', label: 'GIMNASIO' }, { icon: 'images/projects/real/icons/icono-salabar.svg', label: 'SALA BAR' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/real/gallery/comunes/1.webp' }, { src: 'images/projects/real/gallery/comunes/2.webp' }, { src: 'images/projects/real/gallery/comunes/3.webp' }, { src: 'images/projects/real/gallery/comunes/4.webp' }, { src: 'images/projects/real/gallery/comunes/5.webp' }, { src: 'images/projects/real/gallery/comunes/6.webp' }, { src: 'images/projects/real/gallery/comunes/7.webp' }, { src: 'images/projects/real/gallery/comunes/8.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/real/gallery/exteriores/1.webp' }, { src: 'images/projects/real/gallery/exteriores/2.webp' }, { src: 'images/projects/real/gallery/exteriores/3.webp' }, { src: 'images/projects/real/gallery/exteriores/4.webp' }, { src: 'images/projects/real/gallery/exteriores/5.webp' }, { src: 'images/projects/real/gallery/exteriores/6.webp' }, { src: 'images/projects/real/gallery/exteriores/7.webp' }, { src: 'images/projects/real/gallery/exteriores/8.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/real/gallery/interiores/1.webp' }, { src: 'images/projects/real/gallery/interiores/2.webp' }, { src: 'images/projects/real/gallery/interiores/3.webp' }, { src: 'images/projects/real/gallery/interiores/4.webp' }] }] },
      quoter: { projectId: 9, projectName: 'REAL' },
      video: { url: 'https://www.youtube.com/embed/lY6fxsGDaw4', type: 'youtube', title: 'CONOCE PROYECTO REAL', fallbackImage: 'images/projects/real/gallery/comunes/1.webp' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/real/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#778b5c', textColor: '#FFFFFF' },
      ubication: { backgroundColor: '#778b5c', textColor: '#FFFFFF', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.576519865062!2d-77.03280412408937!3d-12.072631588166155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8925c6a03ef%3A0x5a0e4809f222373d!2sJr.%20Francia%20130%2C%20Lima%2015033%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776206266980!5m2!1ses!2scl', address: 'Jr. Francia 130, La Victoria, Lima' },
      executives: { executives: [{ name: 'Dick Bustamante', role: 'Ejecutivo de Ventas', phone: '970639597', photo: 'images/executives/dick-bustamante.webp' }, { name: 'Juan Leyva', role: 'Ejecutivo de Ventas', phone: '912044799', photo: 'images/executives/juan-leyva.webp' }, { name: 'Carlos Quispe', role: 'Ejecutivo de Ventas', phone: '934866686', photo: 'images/executives/carlos-quispe.webp' }] },
    }
  },
  {
    slug: 'escala',
    name: 'Escala',
    district: 'la-victoria',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-escala.png',
    thumbnailUrl: '/images/projects/thumb-escala-home.png',
    sperantProjectId: 4,
    sortOrder: 10,
    sections: {
      hero: { logo: 'images/logos/projects/logo-escala-1-2.webp', projectName: 'Escala', district: 'DEPARTAMENTOS EN LA VICTORIA', overlayColor: 'rgba(50, 70, 90, 0.75)', textColor: '#ffffff', badgeColor: '#ff7f30', descriptionColor: '#f5f0cc', priceLabelColor: '#f5f0cc', priceFromColor: '#ff7f30', textPosition: { bottom: '0%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(38vh, 340px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(28vh, 190px)' } }, slides: [{ image: 'images/projects/escala/hero-1.webp', alt: 'Escala - Fachada' }, { image: 'images/projects/escala/hero-2.webp', alt: 'Escala - Vista exterior' }, { image: 'images/projects/escala/hero-3.webp', alt: 'Escala - Vista' }] },
      specs: {
        stats: { backgroundColor: '#9e3224', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/escala/icons/icono-ambiente-escala.png', label: 'Desde: 40m2 Hasta: 75.63m2' }, location: { icon: 'images/projects/escala/icons/icono-metros-escala.png', label: '1, 2 y 3 ambientes' }, commonAreasLabel: { icon: 'images/projects/escala/icons/icono-pisos-escala.png', label: '31 pisos' } },
        specs: { logo: 'images/logos/projects/logo-escala-1.png', textColor: '#4A5D6B', description: 'ESCALA está ubicado en Gálvez Barrenechea, en la intersección de Javier Prado con el Puente Quiñones. Una moderna torre de 31 pisos con vista a toda la ciudad.', backgroundColor: '#f5f0cc', interiorImage: 'images/projects/escala/specs/interior.png', projectName: 'Escala', brochureUrl: 'docs/brochures/escala.pdf', videoUrl: 'https://www.youtube.com/embed/j2mJQ6IVg9U', projectSubtitle: 'DEPARTAMENTOS EN LA VICTORIA', amenityIcons: [], floors: '31 pisos', unitTypes: '1, 2 y 3 ambientes', areaRange: 'Desde: 40m2 Hasta: 75.63m2' }
      },
      amenities: { backgroundColor: '#ff7f30', items: [{ icon: 'images/projects/escala/icons/icono-juegos-escala.png', label: 'AREAS NINOS' }, { icon: 'images/projects/escala/icons/icono-bbq-escala.png', label: 'ZONA BBQ' }, { icon: 'images/projects/escala/icons/icono-pool-escala.png', label: 'PISCINA' }, { icon: 'images/projects/escala/icons/icono-gym-escala.png', label: 'GIMNASIO' }, { icon: 'images/projects/escala/icons/icono-bar-escala.png', label: 'SALA BAR' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/escala/gallery/comunes/1.webp' }, { src: 'images/projects/escala/gallery/comunes/2.webp' }, { src: 'images/projects/escala/gallery/comunes/3.webp' }, { src: 'images/projects/escala/gallery/comunes/4.webp' }, { src: 'images/projects/escala/gallery/comunes/5.webp' }, { src: 'images/projects/escala/gallery/comunes/6.webp' }, { src: 'images/projects/escala/gallery/comunes/7.webp' }, { src: 'images/projects/escala/gallery/comunes/8.webp' }, { src: 'images/projects/escala/gallery/comunes/9.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/escala/gallery/exteriores/1.webp' }, { src: 'images/projects/escala/gallery/exteriores/2.webp' }, { src: 'images/projects/escala/gallery/exteriores/3.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/escala/gallery/interiores/1.webp' }, { src: 'images/projects/escala/gallery/interiores/2.webp' }, { src: 'images/projects/escala/gallery/interiores/3.webp' }, { src: 'images/projects/escala/gallery/interiores/4.webp' }, { src: 'images/projects/escala/gallery/interiores/5.webp' }] }] },
      quoter: { projectId: 4, projectName: 'Escala' },
      video: { url: 'https://www.youtube.com/embed/j2mJQ6IVg9U', fallbackImage: 'images/projects/escala/hero-1.webp', type: 'iframe', title: 'CONOCE PROYECTO ESCALA', backgroundColor: '#b2e1d8', textColor: '#FFFFFF' },
      virtual_tour: { url: 'https://storage.net-fs.com/hosting/6359227/0/', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#b2e1d8', textColor: '#FFFFFF' },
      ubication: { backgroundColor: '#33668e', textColor: '#FFFFFF', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.343298590849!2d-77.01692212408909!3d-12.088634288151388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c87eebe3b683%3A0x15687c0370c932bd!2sAv.%20Jos%C3%A9%20G%C3%A1lvez%20Barrenechea%20200%2C%20La%20Victoria%2015034%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776206075672!5m2!1ses!2scl', address: 'Av. Gálvez Barrenechea 200 - SANTA CATALINA' },
      executives: { executives: [{ name: 'Patrick Coriat', role: 'Ejecutivo de Ventas', phone: '933336977', photo: 'images/executives/patrick-coriat.webp' }, { name: 'Juda Caceres', role: 'Ejecutivo de Ventas', phone: '947327029', photo: 'images/executives/juda-omar-caceres.webp' }] },
    }
  },
  {
    slug: 'savia',
    name: 'Savia',
    district: 'pueblo-libre',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-savia.svg',
    thumbnailUrl: '/images/projects/thumb-savia-home.png',
    sperantProjectId: 10,
    sortOrder: 11,
    sections: {
      hero: { projectName: 'Savia', district: 'DEPARTAMENTOS EN PUEBLO LIBRE', description: 'ENTREGA INMEDIATA', priceLine1: 'Depas con precio desde:', priceFrom: 'S/ XXX,000*', overlayColor: 'rgba(50, 100, 50, 0.75)', textColor: '#ffffff', badgeColor: '#9aaf99', descriptionColor: '#ddeedd', priceLabelColor: '#ddeedd', priceFromColor: '#607567', textPosition: { bottom: '0%' }, slides: [{ image: 'images/projects/savia/hero-1.webp', alt: 'Savia - Fachada' }] },
      specs: {
        stats: { backgroundColor: '#607567', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/savia/icons/icono-pisos.svg', label: 'Desde 63m2 hasta 77m2' }, location: { icon: 'images/projects/savia/icons/icono-metraje.svg', label: 'Av. Brasil 1470, Pueblo Libre' }, commonAreasLabel: { icon: 'images/projects/savia/icons/icono-dormitorios.svg', label: 'Para disfrutar' } },
        specs: { logo: 'images/logos/projects/logo-savia-1.png', textColor: '#858d86ff', interiorImage: 'images/projects/savia/specs/interior.png', projectName: 'Savia', projectSubtitle: 'DEPARTAMENTOS EN PUEBLO LIBRE', description: 'El edificio Savia reúne todo lo necesario para despertar cada día en el lugar con el que siempre soñaste, con una ubicación estratégica en Av. Brasil.', amenityIcons: [], floors: '27 pisos + Azotea', unitTypes: '3 ambientes', areaRange: 'Desde 63m2 hasta 77m2', brochureUrl: 'docs/brochures/savia.pdf', videoUrl: 'https://www.youtube.com/embed/lvL6jsWh79s' }
      },
      amenities: { backgroundColor: '#9aaf99', items: [{ icon: 'images/projects/savia/icons/icono-juegos.png', label: 'KIDS ROOM' }, { icon: 'images/projects/savia/icons/icono-bbq.png', label: 'BBQ ZONE' }, { icon: 'images/projects/savia/icons/icono-coworking.svg', label: 'COWORKING' }, { icon: 'images/projects/savia/icons/icono-pool.png', label: 'PISCINA' }, { icon: 'images/projects/savia/icons/icono-gym.png', label: 'GYM' }, { icon: 'images/projects/savia/icons/icono-bar.png', label: 'SALA BAR' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/savia/gallery/comunes/1.webp' }, { src: 'images/projects/savia/gallery/comunes/2.webp' }, { src: 'images/projects/savia/gallery/comunes/3.webp' }, { src: 'images/projects/savia/gallery/comunes/4.webp' }, { src: 'images/projects/savia/gallery/comunes/5.webp' }, { src: 'images/projects/savia/gallery/comunes/6.webp' }, { src: 'images/projects/savia/gallery/comunes/7.webp' }, { src: 'images/projects/savia/gallery/comunes/8.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/savia/gallery/interiores/1.webp' }, { src: 'images/projects/savia/gallery/interiores/2.webp' }, { src: 'images/projects/savia/gallery/interiores/3.webp' }, { src: 'images/projects/savia/gallery/interiores/4.webp' }, { src: 'images/projects/savia/gallery/interiores/5.webp' }, { src: 'images/projects/savia/gallery/interiores/6.webp' }, { src: 'images/projects/savia/gallery/interiores/7.webp' }] }] },
      quoter: { projectId: 10, projectName: 'SAVIA' },
      video: { backgroundColor: '#9aaf99', textColor: '#FFFFFF', url: 'https://www.youtube.com/embed/48vBugkbJc8', type: 'youtube', title: 'CONOCE PROYECTO SAVIA', fallbackImage: 'images/projects/savia/1.png' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/savia/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#9aaf99', textColor: '#FFFFFF' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.561175651245!2d-77.05548672408936!3d-12.073685088165174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c94c029309db%3A0x8a3ee11318cf2856!2sWWGW%2BGRH%2C%20Av.%20Brasil%201470%2C%20Pueblo%20Libre%2015084%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776207417754!5m2!1ses!2scl', address: 'Av. Brasil 1470 - Pueblo Libre', backgroundColor: '#9aaf99', textColor: '#FFFFFF', mapsUrl: 'https://maps.google.com/?q=Av.+Brasil+1470,+Pueblo+Libre,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Av+Brasil+1470+Pueblo+Libre+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Jorge Coha', role: 'Ejecutivo de Ventas', phone: '977804343', photo: 'images/executives/jorge-coha.webp' }, { name: 'Jesús Bello', role: 'Ejecutivo de Ventas', phone: '987952815', photo: 'images/executives/jesus-antonio-bello.webp' }] },
    }
  },
  {
    slug: 'florencia',
    name: 'Florencia',
    district: 'pueblo-libre',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-florencia.png',
    thumbnailUrl: '/images/projects/thumb-florencia-home.png',
    sperantProjectId: 5,
    sortOrder: 12,
    sections: {
      hero: { logo: 'images/logos/projects/logo-florencia-10.webp', projectName: 'Florencia', district: 'DEPARTAMENTOS EN PUEBLO LIBRE', description: 'ENTREGA INMEDIATA', priceLine1: 'TU DEPA DE 2 AMBIENTE CON PRECIO DESDE', priceFrom: 'S/ 405,000*', overlayColor: 'rgba(120, 60, 20, 0.75)', textColor: '#ffffff', descriptionStyle: { fontSize: 'clamp(0.65rem, 2.2vw, 2.2rem)', letterSpacing: '0.12em', fontWeight: '700' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 3.4vw, 2.8rem)', fontWeight: '700' }, badgeColor: '#ffffff', descriptionColor: '#c8f5c4', priceLabelColor: '#c8f5c4', priceFromColor: '#c8f5c4', textPosition: { bottom: '30%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(45vh, 455px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(48vh, 555px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(41vh, 365px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(31vh, 205px)' } }, slides: [{ image: 'images/projects/florencia/1.webp', alt: 'Florencia - Fachada' }, { image: 'images/projects/florencia/2.webp', alt: 'Florencia - Vista exterior' }] },
      specs: {
        stats: { backgroundColor: '#038e01', textColor: '#FFFFFF', areaRange: { icon: 'images/projects/florencia/icons/map.png', label: 'Av. Mariano Cornejo 1455, Pueblo Libre' }, location: { icon: 'images/projects/florencia/icons/depart.png', label: 'Desde 57 m2 hasta 166m2' }, commonAreasLabel: { icon: 'images/projects/florencia/icons/piscina.png', label: 'Para disfrutar todos los días' } },
        specs: { logo: 'images/logos/projects/logo-florencia-1.png', interiorImage: 'images/projects/florencia/specs/interior.jpg', projectName: 'Florencia', projectSubtitle: 'DEPARTAMENTOS EN PUEBLO LIBRE', brochureUrl: 'docs/brochures/florencia.pdf', videoUrl: 'https://www.youtube.com/embed/LkungfaWf-c', amenityIcons: [], floors: '22 Pisos', unitTypes: 'Flats y Dúplex de 2 y 3 ambientes', areaRange: 'Desde 57m2 hasta 166m2' }
      },
      amenities: { backgroundColor: '#fc6954', textColor: '#FFFFFF', title: 'Espacios para compartir - áreas comunes', items: [{ icon: 'images/projects/florencia/icons/piscina.svg', label: 'PISCINA' }, { icon: 'images/projects/florencia/icons/parrilla.svg', label: 'PARRILLA' }, { icon: 'images/projects/florencia/icons/gimnasio.svg', label: 'GIMNASIO' }, { icon: 'images/projects/florencia/icons/smart-coffe.svg', label: 'SMART COFFEE' }, { icon: 'images/projects/florencia/icons/sala-bar.svg', label: 'SALA BAR' }, { icon: 'images/projects/florencia/icons/icono-salakids.svg', label: 'KIDS ROOM' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas comunes para disfrutar al máximo cada momento.', images: [{ src: 'images/projects/florencia/gallery/comunes/1.webp' }, { src: 'images/projects/florencia/gallery/comunes/2.webp' }, { src: 'images/projects/florencia/gallery/comunes/3.webp' }, { src: 'images/projects/florencia/gallery/comunes/4.webp' }, { src: 'images/projects/florencia/gallery/comunes/5.webp' }, { src: 'images/projects/florencia/gallery/comunes/6.webp' }, { src: 'images/projects/florencia/gallery/comunes/7.webp' }, { src: 'images/projects/florencia/gallery/comunes/8.webp' }] }, { label: 'Exteriores', subtitle: 'Florencia, donde podrás estar cerca a todo.', images: [{ src: 'images/projects/florencia/gallery/exteriores/1.webp' }, { src: 'images/projects/florencia/gallery/exteriores/2.webp' }, { src: 'images/projects/florencia/gallery/exteriores/3.webp' }, { src: 'images/projects/florencia/gallery/exteriores/4.webp' }] }, { label: 'Interiores', subtitle: 'Departamentos diseñados para tu comodidad.', images: [{ src: 'images/projects/florencia/gallery/interiores/1.webp' }, { src: 'images/projects/florencia/gallery/interiores/2.webp' }, { src: 'images/projects/florencia/gallery/interiores/3.webp' }, { src: 'images/projects/florencia/gallery/interiores/4.webp' }, { src: 'images/projects/florencia/gallery/interiores/5.webp' }, { src: 'images/projects/florencia/gallery/interiores/6.webp' }] }] },
      quoter: { projectId: 5, projectName: 'FLORENCIA' },
      video: { backgroundColor: '#038e01', textColor: '#FFFFFF', url: 'https://www.youtube.com/embed/LkungfaWf-c', type: 'youtube', title: 'CONOCE PROYECTO FLORENCIA', fallbackImage: 'images/projects/florencia/1.webp' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.646109374245!2d-77.06891122408935!3d-12.067852588170593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c919b5b36c87%3A0x3aa7afcc55fb42ec!2sEdificio%20Florencia%2C%20Av.%20Mariano%20H.%20Cornejo%201455%2C%20Lima%2015083%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776207519120!5m2!1ses!2scl', address: 'Av. Mariano Cornejo n°1455, Pueblo Libre', mapsUrl: 'https://maps.google.com/?q=Av.+Mariano+Cornejo+n%C2%B01455,+Pueblo+Libre,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Av+Mariano+Cornejo+n%C2%B01455+Pueblo+Libre+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Kiara Villarreal', role: 'Ejecutiva de Ventas', phone: '922827868', photo: 'images/executives/kiara-villareal.webp' }, { name: 'Eder Davila', role: 'Ejecutivo de Ventas', phone: '987938454', photo: 'images/executives/eder-davila.webp' }] },
    }
  },
  {
    slug: 'medina',
    name: 'Medina',
    district: 'jesus-maria',
    status: 'EN CONSTRUCCIÓN',
    logoUrl: 'images/logos/projects/logo-medina-1.png',
    thumbnailUrl: '/images/projects/thumb-medina-home.png',
    sperantProjectId: 13,
    sortOrder: 13,
    sections: {
      hero: { logo: 'images/logos/projects/logo-medina-1-2.webp', projectName: 'Medina', district: 'DEPARTAMENTOS EN JESÚS MARÍA', badge: 'Lanzamiento', priceLine1: 'TU DEPA DE 2 AMBIENTE CON PRECIO DESDE', priceFrom: 'S/477,000*', overlayColor: 'rgba(76, 107, 82, 0.75)', badgeStyle: { fontSize: 'clamp(0.7rem, 2.5vw, 2.5rem)', letterSpacing: '0.12em', fontWeight: '700' }, descriptionStyle: { fontSize: 'clamp(0.65rem, 2.2vw, 2.2rem)', letterSpacing: '0.12em', fontWeight: '700' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 3.6vw, 3rem)', fontWeight: '700' }, textColor: '#ffffff', badgeColor: '#ffffff', descriptionColor: '#f1e7d5', priceLabelColor: '#f1e7d5', priceFromColor: '#ffffff', textPosition: { bottom: '20%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(39vh, 345px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(30vh, 200px)' } }, slides: [{ image: 'images/projects/medina/1.webp', alt: 'Medina - Fachada' }, { image: 'images/projects/medina/2.webp', alt: 'Medina - Exterior' }, { image: 'images/projects/medina/3.webp', alt: 'Medina - Interior' }] },
      specs: {
        stats: { backgroundColor: '#f1e7d5', sectionTitle: 'Descubre cada detalle de este gran proyecto', areaRange: { icon: 'images/projects/medina/icons/icono_ubica_1.png', label: 'Av. Edgardo Rebagliati 405 Jesús María' }, location: { icon: 'images/projects/medina/icons/icono_depto_1.png', label: 'Desde 34 m2 hasta 149m2' }, commonAreasLabel: { icon: 'images/projects/medina/icons/icono_area_comun_1.png', label: 'Para disfrutar todos los días' } },
        specs: { backgroundColor: '#7f9884', textColor: '#FFFFFF', logo: 'images/logos/projects/logo-medina-1.png', interiorImage: 'images/projects/medina/specs/interior.png', projectName: 'Medina', projectSubtitle: 'DEPARTAMENTOS EN JESÚS MARÍA', brochureUrl: 'docs/brochures/medina.pdf', videoUrl: 'https://www.youtube.com/embed/Rblod8ZrW-8', amenityIcons: [{ icon: 'svg/icons/gym.svg', label: 'Gimnasio' }, { icon: 'svg/icons/grill.svg', label: 'Zona de parrilla' }, { icon: 'svg/icons/meeting-room.svg', label: 'Sala de reuniones' }, { icon: 'svg/icons/coworking.svg', label: 'Coworking' }], floors: '18 pisos + Azotea', unitTypes: 'Flats y Dúplex 1, 2 y 3 ambientes.', areaRange: 'Desde 34 m2 hasta 149 m2' }
      },
      amenities: { backgroundColor: '#B87D4B', items: [{ icon: 'images/projects/medina/icons/icono_lobby.png', label: 'LOBBY' }, { icon: 'images/projects/medina/icons/icono_sreuniones.png', label: 'SALA DE REUNIONES' }, { icon: 'images/projects/medina/icons/icono_working.png', label: 'COWORKING' }, { icon: 'images/projects/medina/icons/icono_parrilla.png', label: 'ZONA DE PARRILLA' }, { icon: 'images/projects/medina/icons/icono_gym.png', label: 'GIMNASIO' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/medina/gallery/comunes/1.webp' }, { src: 'images/projects/medina/gallery/comunes/2.webp' }, { src: 'images/projects/medina/gallery/comunes/3.webp' }, { src: 'images/projects/medina/gallery/comunes/4.webp' }, { src: 'images/projects/medina/gallery/comunes/5.webp' }, { src: 'images/projects/medina/gallery/comunes/6.webp' }] }, { label: 'Exteriores', subtitle: 'Fachada y áreas externas', images: [{ src: 'images/projects/medina/gallery/exteriores/1.webp' }, { src: 'images/projects/medina/gallery/exteriores/2.webp' }, { src: 'images/projects/medina/gallery/exteriores/3.webp' }, { src: 'images/projects/medina/gallery/exteriores/4.webp' }, { src: 'images/projects/medina/gallery/exteriores/5.webp' }, { src: 'images/projects/medina/gallery/exteriores/6.webp' }] }, { label: 'Interiores', subtitle: 'Tu nuevo hogar', images: [{ src: 'images/projects/medina/gallery/interiores/1.webp' }, { src: 'images/projects/medina/gallery/interiores/2.webp' }, { src: 'images/projects/medina/gallery/interiores/3.webp' }, { src: 'images/projects/medina/gallery/interiores/4.webp' }, { src: 'images/projects/medina/gallery/interiores/5.webp' }, { src: 'images/projects/medina/gallery/interiores/6.webp' }] }] },
      quoter: { projectId: 13, projectName: 'MEDINA' },
      video: { backgroundColor: '#c6824f', textColor: '#FFFFFF', url: 'https://www.youtube.com/embed/Rblod8ZrW-8', type: 'youtube', title: 'CONOCE PROYECTO MEDINA', fallbackImage: 'images/projects/central/video-central.png' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/medina/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#605f4d', textColor: '#FFFFFF' },
      ubication: { backgroundColor: '#605f4d', textColor: '#FFFFFF', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.467838119167!2d-77.04230562408924!3d-12.080091488159296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8f1524b8a25%3A0x32fbddcd2bd65a3d!2sAv.%20Edgardo%20Rebagliati%20405%2C%20Jes%C3%BAs%20Mar%C3%ADa%2015073%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776205686064!5m2!1ses!2scl', address: 'Av. Edgardo Rebagliati 405, Jesús María, Lima' },
      executives: { executives: [{ name: 'Jose Luis Napuri', role: 'Ejecutivo de Ventas', phone: '989183368', photo: 'images/executives/jose-napuri.webp' }, { name: 'Ambar Rodriguez', role: 'Ejecutiva de Ventas', phone: '981287530', photo: 'images/executives/ambar-rodriguez.webp' }] },
    }
  },
  {
    slug: 'matiz',
    name: 'Matiz',
    district: 'san-isidro',
    status: 'ENTREGA',
    logoUrl: 'images/logos/projects/logo-matiz-transparent.png',
    thumbnailUrl: '/images/projects/thumb-matiz-home.png',
    sperantProjectId: 26,
    sortOrder: 14,
    sections: {
      hero: { logo: 'images/logos/projects/logo-matiz-1-2.webp', projectName: 'Matiz', district: 'DEPARTAMENTOS EN SAN ISIDRO', description: 'ENTREGA INMEDIATA', badgeStyle: { fontSize: 'clamp(0.65rem, 2.2vw, 2.2rem)', letterSpacing: '0.12em', fontWeight: '700' }, descriptionStyle: { fontSize: 'clamp(0.65rem, 2vw, 2rem)', letterSpacing: '0.12em', fontWeight: '700' }, priceLabelStyle: { fontSize: 'clamp(0.55rem, 1.2vw, 1rem)' }, priceFromStyle: { fontSize: 'clamp(1rem, 3.6vw, 3rem)', fontWeight: '700' }, priceLine1: 'TU DEPA DE 2 AMBIENTE CON PRECIO DESDE', priceFrom: 'S/ 727,000*', overlayColor: 'rgba(50, 80, 50, 0.75)', textColor: '#ffffff', badgeColor: '#ffffff', descriptionColor: '#e0e8ec', priceLabelColor: '#e0e8ec', priceFromColor: '#ffffff', textPosition: { bottom: '20%' }, logoSize: { standard: { width: 'min(50vw, 560px)', height: 'min(44vh, 450px)' }, desktop: { width: 'min(46vw, 700px)', height: 'min(47vh, 550px)' }, tablet: { width: 'min(54vw, 450px)', height: 'min(39vh, 345px)' }, mobile: { width: 'min(74vw, 280px)', height: 'min(30vh, 200px)' } }, slides: [{ image: 'images/projects/matiz/1.webp', alt: 'Matiz - Fachada' }] },
      specs: {
        stats: { areaRange: { icon: 'images/projects/matiz/icons/ico_departamento.png', label: 'Departamentos Desde 80 m2 hasta 255 m2' }, location: { icon: 'images/projects/matiz/icons/ico_ubicacion.png', label: 'Calle Machaypuito 163, San Isidro' }, commonAreasLabel: { icon: 'images/projects/matiz/icons/ico_areaComunes.png', label: 'Para disfrutar todos los días' } },
        specs: { backgroundColor: '#7f9097', textColor: '#FFFFFF', logo: 'images/logos/projects/logo-matiz-1.png', interiorImage: 'images/projects/matiz/specs/interior.png', projectName: 'Matiz', projectSubtitle: 'DEPARTAMENTOS EN SAN ISIDRO', brochureUrl: 'docs/brochures/matiz.pdf', videoUrl: 'https://www.youtube.com/embed/BAzaXqK8Emg', amenityIcons: [], floors: 'Pisos 6 pisos + Azotea', unitTypes: 'Flats y Dúplex 2 y 3 ambientes.', areaRange: 'Desde 80 m2 hasta 255 m2' }
      },
      amenities: { backgroundColor: '#a15739', items: [{ icon: 'images/projects/matiz/icons/ico_lobby.png', label: 'LOBBY' }, { icon: 'images/projects/matiz/icons/ico_piscina.png', label: 'ROOFTOP POOL' }, { icon: 'images/projects/matiz/icons/ico_parrilla.png', label: 'BBQ ZONE' }, { icon: 'images/projects/matiz/icons/ico_bar.png', label: 'LOUNGE' }] },
      gallery: { tabs: [{ label: 'Áreas comunes', subtitle: 'Áreas para ti y tu familia', images: [{ src: 'images/projects/matiz/gallery/comunes/1.webp' }, { src: 'images/projects/matiz/gallery/comunes/2.webp' }, { src: 'images/projects/matiz/gallery/comunes/3.webp' }, { src: 'images/projects/matiz/gallery/comunes/4.webp' }] }, { label: 'Exteriores', images: [{ src: 'images/projects/matiz/gallery/exteriores/1.webp' }, { src: 'images/projects/matiz/gallery/exteriores/2.webp' }] }, { label: 'Interiores', images: [{ src: 'images/projects/matiz/gallery/interiores/1.webp' }, { src: 'images/projects/matiz/gallery/interiores/2.webp' }, { src: 'images/projects/matiz/gallery/interiores/3.webp' }, { src: 'images/projects/matiz/gallery/interiores/4.webp' }, { src: 'images/projects/matiz/gallery/interiores/5.webp' }, { src: 'images/projects/matiz/gallery/interiores/6.webp' }, { src: 'images/projects/matiz/gallery/interiores/7.webp' }, { src: 'images/projects/matiz/gallery/interiores/8.webp' }, { src: 'images/projects/matiz/gallery/interiores/9.webp' }] }] },
      quoter: { projectId: 26, projectName: 'MATIZ' },
      video: { url: 'https://www.youtube.com/embed/BAzaXqK8Emg', type: 'youtube', title: 'CONOCE PROYECTO MATIZ', fallbackImage: 'images/projects/matiz/1.webp', backgroundColor: '#a15739' },
      virtual_tour: { url: 'https://360.nerdstudio.pe/recorridovirtual/paz/matiz/ac/index.htm', projectTitle: 'RECORRIDO VIRTUAL', backgroundColor: '#7f9097', textColor: '#FFFFFF' },
      ubication: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.271052535379!2d-77.03700532408901!3d-12.09358728814692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c85d9be5ca49%3A0xac684974e9adb521!2sC.%20Machaypuito%20163%2C%20San%20Isidro%2015073%2C%20Per%C3%BA!5e0!3m2!1ses!2scl!4v1776207655492!5m2!1ses!2scl', address: 'Calle Machaypuito 163, San Isidro', backgroundColor: '#7f9097', textColor: '#FFFFFF', mapsUrl: 'https://maps.google.com/?q=Calle+Machaypuito+163,+San+Isidro,+Lima,+Per%C3%BA', wazeUrl: 'https://waze.com/ul?q=Calle+Machaypuito+163+San+Isidro+Lima&navigate=yes' },
      executives: { executives: [{ name: 'Gladys Vazquez', role: 'Ejecutiva de Ventas', phone: '922521922', photo: 'images/executives/gladys-vasquez.webp' }, { name: 'Carlos Muga', role: 'Ejecutivo de Ventas', phone: '922522252', photo: 'images/executives/carlos-muga.webp' }] },
    }
  },
];

const PROMOTIONS_DATA = [
  // ── Destacadas (3 columnas) ────────────────────────────────────────────────
  {
    title: 'Lima 15',
    description: 'TU DEPA DE 2 AMBIENTES CON PRECIO DESDE:',
    badgeText: 'S/ 678,000*',
    district: 'Miraflores',
    imageUrl: '/images/projects/thumb-lima15-home.png',
    projectLink: '/departamentos-en-venta/miraflores/lima-15',
    disclaimer: '(*) Precio referencial sujeto a disponibilidad de stock. Financiamiento sujeto a evaluación crediticia.',
    isFeatured: true,
    sortOrder: 1,
  },
  {
    title: 'Marena',
    description: 'LANZAMIENTO — DESCUENTOS HASTA',
    badgeText: 'S/ 120,000*',
    district: 'San Miguel',
    imageUrl: '/images/projects/thumb-marena-home.png',
    projectLink: '/departamentos-en-venta/san-miguel/marena',
    disclaimer: '(*) Descuento válido hasta agotar stock en unidades seleccionadas. No acumulable con otras promociones.',
    isFeatured: true,
    sortOrder: 2,
  },
  {
    title: 'Matiz',
    description: 'TU DEPA DE 2 AMBIENTES CON PRECIO DESDE',
    badgeText: 'S/ 727,000*',
    district: 'San Isidro',
    imageUrl: '/images/projects/thumb-matiz-home.png',
    projectLink: '/departamentos-en-venta/san-isidro/matiz',
    disclaimer: '(*) Precio referencial sujeto a disponibilidad de stock. Financiamiento sujeto a evaluación crediticia.',
    isFeatured: true,
    sortOrder: 3,
  },
  // ── Otros proyectos (4 columnas) ──────────────────────────────────────────
  {
    title: 'Riva',
    description: 'ÚLTIMO MES DE PREVENTA — PRECIO DESDE',
    badgeText: 'S/ 630,000*',
    district: 'Miraflores',
    imageUrl: '/images/projects/thumb-riva-home.png',
    projectLink: '/departamentos-en-venta/miraflores/riva',
    disclaimer: '(*) Válido hasta agotar stock. Sujeto a evaluación crediticia.',
    isFeatured: false,
    sortOrder: 4,
  },
  {
    title: 'Taller',
    description: 'ENTREGA SEPTIEMBRE 2026 — PRECIO DESDE',
    badgeText: 'S/ 554,000*',
    district: 'Miraflores',
    imageUrl: '/images/projects/thumb-taller.png',
    projectLink: '/departamentos-en-venta/miraflores/taller',
    disclaimer: '(*) Precio referencial sujeto a disponibilidad de stock. Financiamiento sujeto a evaluación crediticia.',
    isFeatured: false,
    sortOrder: 5,
  },
  {
    title: 'Medina',
    description: 'TU DEPA DE 2 AMBIENTES CON PRECIO DESDE',
    badgeText: 'S/ 477,000*',
    district: 'Jesús María',
    imageUrl: '/images/projects/thumb-medina-home.png',
    projectLink: '/departamentos-en-venta/jesus-maria/medina',
    disclaimer: '(*) Precio referencial sujeto a disponibilidad de stock. No acumulable con otras promociones. Sujeto a evaluación crediticia.',
    isFeatured: false,
    sortOrder: 6,
  },
  {
    title: 'Serena',
    description: 'ENTREGA INMEDIATA — PRECIO DESDE',
    badgeText: 'S/ 439,000*',
    district: 'San Miguel',
    imageUrl: '/images/projects/thumb-serena.jpg',
    projectLink: '/departamentos-en-venta/san-miguel/serena',
    disclaimer: '(*) Precio desde S/439,000. Financiamiento por 20 años con cuota inicial del 10%. Sujeto a evaluación crediticia.',
    isFeatured: false,
    sortOrder: 7,
  },
  {
    title: 'Patio La Paz',
    description: 'ENTREGA INMEDIATA — CUOTAS DESDE',
    badgeText: 'S/ 2,633*',
    district: 'San Miguel',
    imageUrl: '/images/projects/thumb-patio-home.jpg',
    projectLink: '/departamentos-en-venta/san-miguel/patio-la-paz',
    disclaimer: '(*) Financiamiento por 20 años con Banco Interbank con cuota inicial del 10%, cuota mensual desde S/2,633; tasa de 9.5%. Sujeto a evaluación crediticia.',
    isFeatured: false,
    sortOrder: 8,
  },
  {
    title: 'Florencia',
    description: 'ENTREGA INMEDIATA — PRECIO DESDE',
    badgeText: 'S/ 405,000*',
    district: 'Pueblo Libre',
    imageUrl: '/images/projects/thumb-florencia-home.png',
    projectLink: '/departamentos-en-venta/pueblo-libre/florencia',
    disclaimer: '(*) Precio desde S/405,000. Financiamiento por 20 años con cuota inicial del 10%. Sujeto a evaluación crediticia.',
    isFeatured: false,
    sortOrder: 9,
  },
  {
    title: 'Central',
    description: '¡ÚLTIMOS DEPAS! — PRECIO DESDE',
    badgeText: 'S/ 764,000*',
    district: 'Miraflores',
    imageUrl: '/images/projects/thumb-central-home.png',
    projectLink: '/departamentos-en-venta/miraflores/central',
    disclaimer: '(*) Precio referencial sujeto a disponibilidad de stock. No acumulable con otras promociones.',
    isFeatured: false,
    sortOrder: 10,
  },
];

const DELIVERED_PROJECTS_DATA = [
  { name: 'Piazza',               district: 'Pueblo Libre',    address: 'Av. del Río 111',            rooms: undefined, imageUrl: 'images/delivered-projects/piazza.jpg',               sortOrder: 1  },
  { name: 'Pérgola',              district: 'Jesús María',     address: 'Av. Mello Franco 652',       rooms: undefined, imageUrl: 'images/delivered-projects/pergola.jpg',              sortOrder: 2  },
  { name: 'Lima Uno',             district: 'Cercado de Lima', address: 'Jr. Larrabure y Unanue 150', rooms: undefined, imageUrl: 'images/delivered-projects/lima-uno.jpg',             sortOrder: 3  },
  { name: 'Panoramic',            district: 'San Miguel',      address: 'Av. Costanera 2200',         rooms: '3 dormitorios',         imageUrl: 'images/delivered-projects/panoramic.jpg',            sortOrder: 4  },
  { name: 'Atelier',              district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/atelier.jpg',              sortOrder: 5  },
  { name: 'Bello Horizonte',      district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/bello-horizonte.jpg',      sortOrder: 6  },
  { name: 'City',                 district: 'Santa Beatriz',   address: 'Av. Arequipa 1480',          rooms: '255 dptos. entregados', imageUrl: 'images/delivered-projects/city.jpg',                 sortOrder: 7  },
  { name: 'Ciudad Nueva',         district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/ciudad-nueva.jpg',         sortOrder: 8  },
  { name: 'Ciudad Verde',         district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/ciudad-verde.jpg',         sortOrder: 9  },
  { name: 'Ícono',                district: 'Breña',           address: 'Av. Arica 600',              rooms: '3 dormitorios',         imageUrl: 'images/delivered-projects/icono.jpg',                sortOrder: 10 },
  { name: 'Jardines Santa Clara', district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/jardines-santa-clara.jpg', sortOrder: 11 },
  { name: 'Parque Los Olivos',    district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/parque-los-olivos.jpg',    sortOrder: 12 },
  { name: 'Parque Rímac',         district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/parque-rimac.jpg',         sortOrder: 13 },
  { name: 'Prados del Sol',       district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/prados-del-sol.jpg',       sortOrder: 14 },
  { name: 'Único',                district: undefined,         address: undefined,                    rooms: undefined, imageUrl: 'images/delivered-projects/unico.jpg',                sortOrder: 15 },
];

const DISTRICTS_DATA = [
  { label: 'Miraflores',   slug: 'miraflores',   sortOrder: 1 },
  { label: 'San Miguel',   slug: 'san-miguel',   sortOrder: 2 },
  { label: 'Pueblo Libre', slug: 'pueblo-libre', sortOrder: 3 },
  { label: 'La Victoria',  slug: 'la-victoria',  sortOrder: 4 },
  { label: 'Jesús María',  slug: 'jesus-maria',  sortOrder: 5 },
  { label: 'San Isidro',   slug: 'san-isidro',   sortOrder: 6 },
];

async function seed() {
  await AppDataSource.initialize();
  console.log('Conectado a la base de datos');

  const projectRepo = AppDataSource.getRepository(Project);
  const sectionRepo = AppDataSource.getRepository(ProjectSection);
  const promotionRepo = AppDataSource.getRepository(Promotion);
  const deliveredRepo = AppDataSource.getRepository(DeliveredProject);
  const districtRepo = AppDataSource.getRepository(District);

  for (const data of PROJECTS_DATA) {
    let project = await projectRepo.findOne({ where: { slug: data.slug } });
    if (!project) {
      project = projectRepo.create({
        slug: data.slug,
        name: data.name,
        district: data.district,
        status: data.status as any,
        logoUrl: data.logoUrl,
        thumbnailUrl: data.thumbnailUrl,
        sperantProjectId: data.sperantProjectId,
        sortOrder: data.sortOrder,
        isActive: true,
      });
      project = await projectRepo.save(project);
      console.log(`✓ Proyecto creado: ${data.name}`);
    } else {
      console.log(`→ Proyecto ya existe: ${data.name}`);
    }

    for (const [key, config] of Object.entries(data.sections)) {
      const sectionKey = key as any;
      let section = await sectionRepo.findOne({ where: { projectId: project.id, sectionKey } });
      if (!section) {
        section = sectionRepo.create({ projectId: project.id, sectionKey, isVisible: true, sortOrder: 0 });
      }
      section.config = JSON.stringify(config);
      await sectionRepo.save(section);
    }
    console.log(`  ✓ Secciones guardadas: ${data.name}`);
  }

  // ── Promociones ─────────────────────────────────────────────────────────────
  console.log('\nInsertando promociones...');
  for (const data of PROMOTIONS_DATA) {
    const existing = await promotionRepo.findOne({ where: { title: data.title, district: data.district } });
    if (!existing) {
      await promotionRepo.save(promotionRepo.create({ ...data, isActive: true }));
      console.log(`  ✓ Promoción creada: ${data.title} (${data.district})`);
    } else {
      console.log(`  → Promoción ya existe: ${data.title} (${data.district})`);
    }
  }

  // ── Proyectos Entregados ─────────────────────────────────────────────────────
  console.log('\nInsertando proyectos entregados...');
  for (const data of DELIVERED_PROJECTS_DATA) {
    const existing = await deliveredRepo.findOne({ where: { name: data.name } });
    if (!existing) {
      await deliveredRepo.save(deliveredRepo.create({ ...data, isActive: true }));
      console.log(`  ✓ Proyecto entregado creado: ${data.name}`);
    } else {
      console.log(`  → Proyecto entregado ya existe: ${data.name}`);
    }
  }

  // ── Distritos ────────────────────────────────────────────────────────────────
  console.log('\nInsertando distritos...');
  for (const data of DISTRICTS_DATA) {
    const existing = await districtRepo.findOne({ where: { slug: data.slug } });
    if (!existing) {
      await districtRepo.save(districtRepo.create(data));
      console.log(`  ✓ Distrito creado: ${data.label}`);
    } else {
      console.log(`  → Distrito ya existe: ${data.label}`);
    }
  }

  // ── Banner promocional por proyecto (promo_banner) ────────────────────────
  console.log('\nInsertando/actualizando secciones promo_banner...');

  // Mapeo slug → nombre de archivo del banner subido
  const PROMO_BANNERS_MAP: Record<string, string> = {
    'lima-15':      '/uploads/images/promotions/projects/banner-lima15.webp',
    'riva':         '/uploads/images/promotions/projects/banner-riva.webp',
    'central':      '/uploads/images/promotions/projects/banner-central.webp',
    'taller':       '/uploads/images/promotions/projects/banner-taller.webp',
    'marena':       '/uploads/images/promotions/projects/banner-marena.webp',
    'serena':       '/uploads/images/promotions/projects/banner-serena.webp',
    'patio-la-paz': '/uploads/images/promotions/projects/banner-patio.webp',
    'amalfi':       '/uploads/images/promotions/projects/banner-amalfi.webp',
    'real':         '/uploads/images/promotions/projects/banner-real.webp',
    'escala':       '/uploads/images/promotions/projects/banner-escala.webp',
    'savia':        '/uploads/images/promotions/projects/banner-savia.webp',
    'florencia':    '/uploads/images/promotions/projects/banner-florencia.webp',
    'medina':       '/uploads/images/promotions/projects/banner-medina.webp',
    'matiz':        '/uploads/images/promotions/projects/banner-matiz.webp',
  };

  const allProjects = await projectRepo.find();
  for (const project of allProjects) {
    const imageUrl = PROMO_BANNERS_MAP[project.slug];
    const config = JSON.stringify({
      imageDesktop: imageUrl ?? null,
      imageMobile: null,
      link: null,
      isVisible: !!imageUrl,
    });

    let section = await sectionRepo.findOne({
      where: { projectId: project.id, sectionKey: 'promo_banner' as any },
    });
    if (!section) {
      section = sectionRepo.create({
        projectId: project.id,
        sectionKey: 'promo_banner' as any,
        sortOrder: 0,
      });
      console.log(`  ✓ promo_banner creado: ${project.slug}`);
    } else {
      console.log(`  ↺ promo_banner actualizado: ${project.slug}`);
    }
    section.config = config;
    section.isVisible = !!imageUrl;
    await sectionRepo.save(section);
  }

  // ── CMS Settings (banners globales) ──────────────────────────────────────
  console.log('\nInsertando CMS settings...');
  const settingRepo = AppDataSource.getRepository(CmsSetting);
  const CMS_SETTINGS_DATA = [
    {
      key: 'home_promo_banner',
      value: '/images/home/home_m.png',
      label: 'Banner promocional del home (enlaza a /promotions)',
    },
    {
      key: 'promos_hero_desktop',
      value: '/images/promotions/banner-hero-desk.jpg',
      label: 'Hero banner página Promociones — desktop',
    },
    {
      key: 'promos_hero_mobile',
      value: '/images/promotions/banner-hero-mb.jpg',
      label: 'Hero banner página Promociones — móvil (≤768 px)',
    },
  ];
  for (const data of CMS_SETTINGS_DATA) {
    const existing = await settingRepo.findOne({ where: { key: data.key } });
    if (!existing) {
      await settingRepo.save(settingRepo.create(data));
      console.log(`  ✓ Setting creado: ${data.key}`);
    } else {
      console.log(`  → Setting ya existe: ${data.key}`);
    }
  }

  await AppDataSource.destroy();
  console.log('\n✅ Seed completado exitosamente');
}

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});