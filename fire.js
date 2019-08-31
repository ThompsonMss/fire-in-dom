const pixelFogoArray = [];
const fogoLinha = 40;
const fogoColuna = 40;
const paletaCoresFogo = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]


function inicializando(){
  criandoEstruturaDadosFogo();
  criandoFogoFonte();
  renderizandoFogo();

  setInterval(calculandoPropagacaoFogo, 50);
}

function criandoEstruturaDadosFogo(){
  const numeroDePixels = fogoLinha * fogoColuna;

  for(let i = 0; i < numeroDePixels; i++){
    pixelFogoArray[i] = 0;
  }
}

function atualizandoIntensidadeFogo(atualIndexPixel){
  const abaixoIndexPixel = atualIndexPixel + fogoColuna;

  if(abaixoIndexPixel >= fogoColuna * fogoLinha) return;

  const decair = Math.floor(Math.random() * 3);
  const abaixoPixelFogoIntensidade = pixelFogoArray[abaixoIndexPixel];
  const novoFogoIntensidade = 
    abaixoPixelFogoIntensidade - decair >= 0 ? abaixoPixelFogoIntensidade - decair : 0;

  pixelFogoArray[atualIndexPixel - decair] = novoFogoIntensidade;
}

function calculandoPropagacaoFogo(){
  for(let coluna = 0; coluna < fogoColuna; coluna++){
    for(let linha = 0; linha < fogoLinha; linha++){
      const indexPixel = coluna + (fogoColuna * linha);

      atualizandoIntensidadeFogo(indexPixel);
    }
  }

  renderizandoFogo();
}

function renderizandoFogo(){
  const debug = false;
  let html = '<table cellpadding=0 cellspacing=0 >';
    for(let linha = 0; linha < fogoLinha; linha++){
      html += '<tr>';
      for(let coluna = 0; coluna < fogoColuna; coluna++){
        const indexPixel = coluna + (fogoColuna * linha);
        const fogoIntensidade = pixelFogoArray[indexPixel];

        if(debug === true){
          html += '<td>';
          html += `<div class="pixel-index">${indexPixel}</div>`;
          html += fogoIntensidade;
          html += '</td>';
        }else{
          const cor = paletaCoresFogo[fogoIntensidade];
          const corString = `${cor.r}, ${cor.g}, ${cor.b}`;
          html += `<td class="pixel" style="background-color: rgb(${corString})">`;
          html += '</td>'
        }

      }
      html += '</tr>';
    }
  html += '</table>';

  document.querySelector('#fireCanvas').innerHTML = html;
}

function criandoFogoFonte(){
  for(let coluna = 0; coluna < fogoColuna; coluna++){
    const inudarPixelIndex = fogoColuna * fogoLinha;
    const indexPixel = (inudarPixelIndex - fogoColuna) + coluna;

    pixelFogoArray[indexPixel] = 36;
  }
}

inicializando();