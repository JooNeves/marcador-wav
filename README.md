# Marcador WAV

Leitor de WAV para telemóvel que lê as **marcas (cues) embebidas no próprio ficheiro** — as que o REAPER escreve no render — e permite reproduzir saltando de marca em marca.

**App:** https://jooneves.github.io/marcador-wav/

## O que faz

- Lê os chunks `cue `, `LIST/adtl` (`labl`, `ltxt`) do WAV: posições, nomes e regiões (início/fim).
- Importa marcas de ficheiro de texto quando o WAV não traz cues: CSV do Region/Marker Manager do REAPER (`#,Name,Start,End,…`), labels tipo Audacity (separadas por tab), tempos em `h:mm:ss.mmm` ou em segundos.
- Reprodução com salto para a marca anterior/seguinte, toque na forma de onda para posicionar (com snap às marcas) e loop do troço entre marcas.
- Zoom e deslocamento na forma de onda, adicionar/renomear/apagar marcas, copiar a lista para a área de transferência.
- As marcas editadas ficam guardadas no próprio browser, por nome e duração do ficheiro.

## Privacidade

Corre inteiramente no browser. O áudio nunca sai do dispositivo — não há servidor, não há upload.

## Instalar no iPhone

Abrir o endereço no Safari → **Partilhar** → **Adicionar ao ecrã principal**. Depois da primeira abertura funciona sem rede.

## Ficheiros

- `index.html` — a app completa (HTML, CSS e JS num ficheiro)
- `sw.js` — service worker, cache para uso sem rede
- `manifest.webmanifest` — manifesto PWA
