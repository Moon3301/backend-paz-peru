<?php
defined('_JEXEC') or die;
header('Content-Type: text/html; charset=utf-8');

$mydoc = JFactory::getDocument(); 
$tituloNotify = $mydoc->getTitle();

//Detección del ID del proyecto desde la URL
$url = $_SERVER['REQUEST_URI'];
$idProyecto = 1;
$proyecto = "Eterniasoft"; //TEST

if (strpos($url, 'central') !== false) { $idProyecto = 2; $proyecto = "CENTRAL"; }
if (strpos($url, 'galia') !== false) { $idProyecto = 6; $proyecto = "GALIA"; }
if (strpos($url, 'taller') !== false) { $idProyecto = 12; $proyecto = "TALLER"; }
if (strpos($url, 'real') !== false) { $idProyecto = 9; $proyecto = "REAL"; }
if (strpos($url, 'escala') !== false) { $idProyecto = 4; $proyecto = "ESCALA"; }
if (strpos($url, 'serena') !== false) { $idProyecto = 11; $proyecto = "SERENA"; }
if (strpos($url, 'patio') !== false) { $idProyecto = 8; $proyecto = "PATIO"; }
if (strpos($url, 'amalfi') !== false) { $idProyecto = 1; $proyecto = "AMALFI"; }
if (strpos($url, 'savia') !== false) { $idProyecto = 10; $proyecto = "SAVIA"; }
if (strpos($url, 'magnolia') !== false) { $idProyecto = 7; $proyecto = "MAGNOLIA"; }
if (strpos($url, 'florencia') !== false) { $idProyecto = 5; $proyecto = "FLORENCIA"; }
if (strpos($url, 'matiz') !== false) { $idProyecto = 26; $proyecto = "MATIZ"; }
if (strpos($url, 'lima15') !== false) { $idProyecto = 27; $proyecto = "LIMA15"; }


//Enpoint de conexión al servicio
$API_PRD = "https://servicios.paz.cl"; //PRD
$API_DEV = "172.30.201.81:8029"; // TEST;

$APIURL = $API_DEV. "/api/sperant?idProyecto=" . $idProyecto;

// Llamada al API inventa para obtener unidades agrupadas
$postData = json_encode(['idProyecto' => $idProyecto]);
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $APIURL,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postData,
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($postData)
    )
));
$response = curl_exec($ch);
curl_close($ch);
$unidades = json_decode($response, true);

// Agrupar unidades por cantidad de dormitorios y luego por tipología
$groupedUnits = [];

foreach ($unidades as $unidad) {
    $numDormitorios = $unidad['CantidadDormitorios'];
    $tipologiaId = $unidad['Tipologia']['IdTipologia'];
    $tipologiaNombre = $unidad['Tipologia']['NombreTipologia'];
    $tipologiaImagen = $unidad['Tipologia']['UrlImagenTipologia'];

    if (!isset($groupedUnits[$numDormitorios])) {
        $groupedUnits[$numDormitorios] = [];
    }

    if (!isset($groupedUnits[$numDormitorios][$tipologiaId])) {
        $groupedUnits[$numDormitorios][$tipologiaId] = [
            'NombreTipologia' => $tipologiaNombre,
            'UrlImagenTipologia' => $tipologiaImagen,
            'Unidades' => []
        ];
    }

    $groupedUnits[$numDormitorios][$tipologiaId]['Unidades'][] = $unidad;
}

// Ordenar por número de dormitorios
ksort($groupedUnits);

// Ordenar alfabéticamente las tipologías por nombre
foreach ($groupedUnits as $numDormitorios => &$tipologias) {
    uasort($tipologias, function ($a, $b) {
        return strnatcasecmp($a['NombreTipologia'], $b['NombreTipologia']);
    });
}
unset($tipologias); // Buen hábito al usar referencias


?>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<style>
  .contenedorFiltroTU{
    display:flex;
    justify-content: space-between;
    align-content: start;
    flex-wrap: wrap;
  }
  .itemUnidad{
      flex-basis: 265px;
  }
  .imgPlanta{
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 67% !important;
  }
  .imgPlantaModal {
    width: 100%;
    border: 1px solid #333;
    border-radius: 10px;
}
.contenedores{
  
}

</style>
<section id="custom-data-form"> 
  
  <?php 
    if(count($groupedUnits) > 0){  
  ?>
<div class="row row-cols-1 row-cols-md-2">
    <div class="col">
      <div class="contenedores" >
        <h3 class="text-subtitulo">Tipo unidad</h3>
        <div class="tabbable tab-dormitorio" id="my_tabs">
          <ul class="nav nav-pills nav-justified mb-3" id="bedroom-tabs" role="tablist">
            <?php $i = 0; foreach ($groupedUnits as $dormitorios => $tipologias): ?>
              <li class="nav-item">
                <a class="nav-link <?php echo $i === 0 ? 'active' : ''; ?>" 
                  id="tab-<?php echo $dormitorios; ?>" 
                  data-toggle="pill" 
                  href="#content-<?php echo $dormitorios; ?>" 
                  role="tab">
                  <?php echo $dormitorios; ?> <?php echo $dormitorios == '1' ? 'Ambiente' : 'Ambientes'; ?>
                </a>
              </li>
            <?php $i++; endforeach; ?>
          </ul>
        </div>
        <div class="contenedorFiltroTU">
          <div>
              <div class="tab-content tabbable tab-dormitorio" id="bedroom-tabs-content">
              <?php $i = 0; foreach ($groupedUnits as $dormitorios => $tipologias): ?>
                <div class="tab-pane fade <?php echo $i === 0 ? 'active' : ''; ?>" 
                    id="content-<?php echo $dormitorios; ?>" 
                    role="tabpanel">

                  <h3 class="text-subtitulo">Tipolog&iacute;a</h3>

                  <div class="row fixbtns">
                    <?php foreach ($tipologias as $tipologiaId => $data): ?>
                      <div class="mb-3">
                        <button 
                          class="btn btn-block tipologia-btn nav-link" 
                          data-image="<?php echo $data['UrlImagenTipologia']; ?>" 
                          data-tipologia-id="<?php echo $tipologiaId; ?>"
                          data-nombre-tipologia="<?php echo $data['NombreTipologia']; ?>"
                          data-unidades='<?php echo json_encode($data['Unidades']); ?>'
                        >
                          <?php echo $data['NombreTipologia']; ?>
                        </button>
                      </div>
                    <?php endforeach; ?>
                  </div>
                </div>

              <?php $i++; endforeach; ?>
            </div>
          </div>
          <div class="itemUnidad">
            <!-- Select de unidades (fuera del foreach, ï¿½nico por cada grupo de dormitorios) -->
            <div class="select-unidades-box" style="display: none;">
              <label for="unidadSelect">Unidad</label>
              <select id="unidadSelect" class="form-control unidad-select">
                <option value="" data-unidad="">Seleccionar</option>
              </select>
            </div>
          </div>
        </div>
        
        
        <div id="tipologiaDetalle">
          <h4 id="tipologiaNombre"> </h4>
          <a href="#" data-toggle="modal" data-target="#ModalImgPlanta"><img id="unitImage" src="" alt="Imagen unidad" class="imgPlanta"></a>
        </div>

      </div>
    </div>
            
  <!-- FORMULARIO -->
  <div class="col">
  <div class="contenedores">
    <div class="box-form">
      <form id="formulario" method="POST" action="">      
        <h3 class="text-subtitulo mb-2">Completa los datos:</h3>
        <div class="form-group">
          <input  id="dni" name="dni" type="text" class="form-control numericos" placeholder="DNI/CE" maxlength="12" onkeyup="validateNumber(this)">
        </div>
        <div class="form-group">
          <input id="nombre" name="nombre" type="text" class="form-control txtOnly"  placeholder="Nombre" maxlength="50" onkeyup="validateText(this)">
        </div>
        <div class="form-group">
          <input  id="apellido" name="apellido" type="text" class="form-control txtOnly"  placeholder="Apellido" maxlength="50" onkeyup="validateText(this)">
        </div>
        <div class="form-group">
          <input id="email" name="email" type="text" class="form-control"  placeholder="Email" maxlength="50" onkeyup="validateEmail(this)">
        </div>
        <div class="form-group">
          <input id="celular" name="celular" type="text" class="form-control numericos"  placeholder="Celular" maxlength="9" onkeyup="validateNumber(this)">
        </div>
        <div class="form-group mb-4">
          <select name="rangoEdad" id="rangoEdad" title="Seleccione tu rango" required="" class="form-control" aria-required="true">
            <option data-option="ocpion" value="">Indica tu rango de edad</option>
            <option data-option="ocpion" value="18 - 25">18 - 25</option>
            <option data-option="ocpion" value="26 - 35">26 - 35</option>
            <option data-option="ocpion" value="36 - 45">36 - 45</option>
            <option data-option="ocpion" value="46 - 55">46 - 55</option>
            <option data-option="ocpion" value="56 - 65">56 - 65</option>
            <option data-option="ocpion" value="66ams">65 a m&aacute;s</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <select name="razoncontacto" id="razoncontacto" title="Seleccione una unidad" required="" class="form-control" aria-required="true">
            <option data-option="ocpion" value="">Â¿C&oacute;mo deseas ser contactado?</option>
            <option data-option="ocpion" value="Whatsapp">Whatsapp</option>
            <option data-option="ocpion" value="Celular">Celular</option>
            <option data-option="ocpion" value="Email">Email</option>
            <option data-option="ocpion" value="Otro medio">Otro medio</option>
          </select>
        </div>
        <div class="form-check onlyradio">
          <input class="form-check-input" type="checkbox" id="terminos" name="terminos" value="SI">
          <label class="form-check-label texto-terminos" for="terminos">Autorizo el tratamiento de mis datos personales seg&uacute;n la <a href="https://paz.pe/politica-de-privacidad-web" target="_blank">Pol&iacute;tica de Privacidad.</a>
          </label>
        </div>
        <div class="form-group pt-4">
          <button class="btn btn-primary btnCotizar" id="cotizar"> Cotizar </button>
        </div>

        <input id="idProyecto" type="text" value="<?php echo $idProyecto; ?>" disabled hidden/>
        <input id="proyecto" type="text" value="<?php echo $proyecto; ?>" disabled hidden/>
        <input type="hidden" name="unidad_id" id="unidad_id">
        <input type="hidden" name="tipologia_id" id="tipologia_id">
      </form>
    </div>
  </div>  
  </div>
  <?php 
    }else{
      echo '<h1 class="sinUndidades"> Este proyecto no tiene unidades disponibles para cotizar</h1>';
    }
  ?>
  </div>
</section>

<!-- Modal -->
<div class="modal fade" id="ModalImgPlanta" tabindex="-1">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div >
            <img id="imgPlantaModal" src="https://sperant.s3.amazonaws.com/paz/type/30/COTIZADOR_ESPERANT_AMALFI_MAR25_TIPO9.jpg" alt="Imagen unidad" class="imgPlantaModal">
          </div>
      </div>
      
    </div>
  </div>
</div>

<!-- JS para cambiar imagen y nombre de tipología dinámicamente -->
<script>
document.addEventListener("DOMContentLoaded", function () {
  const tipologiaButtons = document.querySelectorAll(".tipologia-btn");
  const unidadSelect = document.getElementById("unidadSelect");
  const selectBox = document.querySelector(".select-unidades-box");
  const imageElement = document.getElementById("unitImage");
  const imageModalElement = document.getElementById("imgPlantaModal");

  function activarTipologia(btn) {
    // Actualizar imagen lo más rápido posible
    const imgSrc = btn.getAttribute("data-image");
    if (imageElement && imgSrc) imageElement.src = imgSrc;
    if (imageModalElement && imgSrc) imageModalElement.src = imgSrc;

    // Luego actualizar la clase activa
    requestAnimationFrame(() => {
      tipologiaButtons.forEach(b => b.classList.remove("active-btn"));
      btn.classList.add("active-btn");
    });

    // Preparar datos de unidades (post-imagen)
    requestAnimationFrame(() => {
      const unidades = JSON.parse(btn.getAttribute("data-unidades") || "[]");
      unidadSelect.innerHTML = '<option value="">Seleccionar</option>';
      unidades.forEach(unidad => {
        const option = document.createElement("option");
        option.value = unidad.IdUnidad;
        option.textContent = unidad.NombreUnidad;
        unidadSelect.appendChild(option);
      });

      selectBox.style.display = "block";
    });
  }

  tipologiaButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      activarTipologia(this);
    });
  });

  // ? Activar primera tipología por defecto
  if (tipologiaButtons.length > 0) {
    activarTipologia(tipologiaButtons[0]);
  }
});
</script>





<script>
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    const unidadActive = document.querySelector(".c-cardunidad.is-active");
    const tipologiaActive = document.querySelector(".c-cardtipologia.is-active");

    const unidadId = unidadActive ? unidadActive.getAttribute("data-id") : "";
    const tipologiaId = tipologiaActive ? tipologiaActive.getAttribute("data-id") : "";

    document.getElementById("unidad_id").value = unidadId;
    document.getElementById("tipologia_id").value = tipologiaId;
  });
});
</script>


<!-- VALIDACIONES JS FORMULARIO -->
<script type="text/javascript">

  function validateText(input) {
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
  }

  function validateNumber(input) {
    input.value = input.value.replace(/\D/g, '');
  }

  function validateEmail(input) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    input.style.borderColor = regex.test(input.value) ? 'green' : 'red';
  }


  document.addEventListener('DOMContentLoaded', function () {

  //ENVIA DATOS AL CRM
  document.getElementById('cotizar').addEventListener('click', function(e) {
    e.preventDefault();

    let proyectoID = document.getElementById('idProyecto').value.trim();
    let nombreProyecto = document.getElementById('proyecto').value.trim();
    let unidadID = document.getElementById('unidadSelect')?.value.trim();
    let tipologiaID = document.querySelector('.active-btn')?.getAttribute("data-tipologia-id") || '';
    let unidad = document.getElementById('unidadSelect')?.selectedOptions[0].textContent || '';
    let tipologia = document.querySelector('.active-btn')?.getAttribute("data-nombre-tipologia") || '';

    let urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get('utm_source') || 'organico';
    let utmMedium = urlParams.get('utm_medium') || 'proforma web';
    let utmCampaign = urlParams.get('utm_campaign') || 'organico';

    let dni = document.getElementById('dni')?.value.trim() || '';
    let firstName = document.getElementById('nombre')?.value.trim() || '';
    let lastName = document.getElementById('apellido')?.value.trim() || '';
    let email = document.getElementById('email')?.value.trim() || '';
    let phone = document.getElementById('celular')?.value.trim() || '';
    let rangoEdad = document.getElementById('rangoEdad')?.value.trim() || '';
    let razonContacto = document.getElementById('razoncontacto')?.value.trim() || '';
    let acceptTerms = document.getElementById('terminos')?.checked || false;

    let sourceID = 35; //google

    // Validaciones
    if (dni == '') {
        alert("Por favor ingrese su DNI.");
        return false;
    }
    if (firstName == '') {
        alert("Por favor ingrese su nombre.");
        return false;
    }
    if (lastName == '') {
        alert("Por favor ingrese su apellido.");
        return false;
    }      
    if (email == '') {
        alert("Por favor ingrese su correo.");
        return false;
    }   
    if (phone == '') {
        alert("Por favor ingrese su número celular.");
        return false;
    }         
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Por favor ingrese un email válido.");
        return false;
    }
    if (!phone.match(/^\d+$/) || phone.length < 9) {
        alert("Por favor ingrese un teléfono válido.");
        return false;
    }
    if(rangoEdad == ''){
      alert("Indica tu rango de edad.");
      return false;
    }
    if(razonContacto == '' ){
      alert("Indique como quiere ser contactado.");
      return false;
    }      
    if (!acceptTerms) {
        alert("Debe aceptar los terminos para continuar.");
        return false;
    }
    if(unidad == "Seleccionar"){
        alert("Favor seleccione una unidad.");
        return false;      
    }

    // Data cliente
    var payload = {
      "document": dni,
      "fname": firstName,
      "lname": lastName,
      "email": email,
      "phone": phone,
      "observation": "Rango de edad: " + rangoEdad + " | Razon de contacto: " + razonContacto,
      "proyecto": nombreProyecto,
      "proyectoID": proyectoID,
      "unidad": unidad,
      "tipologia": tipologia,   
      "unidadID": unidadID,
      "tipologiaID": tipologiaID,   
      "utm_source": utmSource,
      "utm_medium": utmMedium,
      "utm_campaign": utmCampaign,
      "input_channel_id": 1, //pagina web - 4 TEST
      "source_id": sourceID, 
      "interest_type_id": 5 // por contactar - 15 TEST
    };

    console.log("Proyecto: " + proyectoID)
    console.log("Unidad: " + unidadID)
    console.log("Tipologia: " + tipologiaID)

    console.log(payload)

    document.getElementById('cotizar').setAttribute("disabled", "disabled");      
    document.getElementById('cotizar').textContent = "Cargando...";      

    fetch("/templates/g5_helium/html/mod_k2_content/page-cotizador/enviocrm.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.success) {

	document.getElementById('formulario').reset();
        document.getElementById('cotizar').removeAttribute("disabled");
        document.getElementById('cotizar').textContent = "Cotizar";

        window.location.href = '/gracias/';
      } else {
        alert("Error: " + res.message);
        document.getElementById('cotizar').removeAttribute("disabled");
        document.getElementById('cotizar').textContent = "Cotizar";
      }
    });


  });

});

</script>

<!-- Precarga imagenes de todas las tipologias -->
<script>
document.addEventListener("DOMContentLoaded", function () {
  const tipologiaButtons = document.querySelectorAll(".tipologia-btn");

  tipologiaButtons.forEach(btn => {
    const imgSrc = btn.getAttribute("data-image");
    if (imgSrc) {
      const img = new Image();
      img.src = imgSrc;
    }
  });
});
</script>


<!-- CSS -->
<style>
  #unidadSelect{
    max-width: 340px;
  }
  #cotizar {
    color: #ffffff;
    background-color: #B2221F;
    display: block;
    width: 100% !important;
    font-family: 'Barlow Semi Condensed';
    font-size: 16px;
    font-weight: bolder;
    line-height: 2;
    text-transform: uppercase;
    border: none;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    transition: all 0.2s;
  }

  .texto-terminos{
    margin-left: 20px;
  }
  .fixbtns{
    display: flex;
    justify-content: flex-start;  
    gap: 1rem;
    padding-left: 1rem !important;
  }
  
  .tipologia-btn, .form-cotizar .tab-dormitorio .nav-pills .nav-link{
    color: #ffffff !important;
    font-weight: 600 !important;
    border: 1px solid #891a17 !important;
    text-transform: uppercase !important;
    background: transparent !important;    
    width: auto !important;
  }
  .tipologia-btn:hover{
    color: #ffffff !important;
    background: #891a17 !important;
  }
  .active-btn, .form-cotizar .tab-dormitorio .nav-pills .nav-link.active{
    color: #ffffff !important;
    background: #891a17 !important;
    border: 1px solid #891a17 !important;
  }

  #custom-data-form {
      display: flex;
      gap: 20px;
      background: #262626;
      color: #f7f7f7;
      padding: 80px;
  }
  #unitSelector{
    width: 60%;
  }
  #unitImage{
    max-width: 50%;
    margin-top: 20px;
  }
    #quoteForm div {
        display: flex;
        gap: 10px;
    }
    #quoteForm input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    #quoteForm button {
        width: 100%;
        padding: 10px;
        background: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }
    .sinUndidades{
      color: #FFFFFF;
      font-size: 32px;
      text-align: center;
      padding: 40px 20px;
      margin: 0 auto;
    }
    .#g-header a{
      max-width: fit-content;
    }


  .contenedorFiltroTU{
    display:flex;
    justify-content: space-between;
    align-content: start;
    flex-wrap: wrap;
  }
  .itemUnidad{
      flex-basis: 265px;
  }
  .imgPlanta{
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 67% !important;
  }
  .imgPlantaModal {
    width: 100%;
    border: 1px solid #333;
    border-radius: 10px;
}
.contenedores{
  
}




h3.text-subtitulo {
    font-family: 'Laca';
    font-weight: 500;
}
h3.text-subtitulo {
    color: #ffffff;
    font-family: 'Barlow Semi Condensed';
    font-size: 16px;
    font-weight: 600;
    margin-bottom: .7rem;
}
.fade:not(.show) {
    opacity: 1;
}
@media(max-width:767px){
  #custom-data-form {
    display: flex;
    gap: 9px;
    background: #262626;
    color: #f7f7f7;
    padding: 1rem;
}
.contenedores .nav{
    flex-direction: column;
}
.imgPlanta {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 100% !important;
}
}

@media(min-width:1200px) and (max-width:1399px){
  .itemUnidad {
    flex-basis: 156px;
}
h3.text-subtitulo {
    
    margin-bottom: .4rem;
}
}
@media(min-width: 1400px) and (max-width:1700px){
  .itemUnidad {
    flex-basis: 201px;
  }
  h3.text-subtitulo {
    
    margin-bottom: .4rem;
}
}

</style>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (link.href.includes('bootstrap-gantry.css')) {
        link.disabled = true; 
        link.parentNode.removeChild(link); 
      }
    });
  });
</script>
