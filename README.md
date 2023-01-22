
<p align="center">
  <img src="docs/lost_logo-512x512.svg" alt="Lost-Logo" width="100">
</p>

<h2 align="center">Lost</h2>

## :round_pushpin: Lost

```Lost``` is a geolocation [PWA](https://de.wikipedia.org/wiki/Progressive_Web_App) that helps you find your next destination. Find out more about specific places by clicking on the map, collect your favorite locations and navigate to them from your location.

## Web-Eng-2_Gruppe4 

### :busts_in_silhouette: Web Engineering 2 Project from: 
- [Christoph Koßlowski](https://github.com/Chri5K0)
- [Lea Silberzahn](https://github.com/lealabert)
- [Lukas Adrion](https://github.com/LukasAdrion)
- [Nico Bayer](https://github.com/NicoB-Code)
- [Thibault Rey](https://github.com/Thibse)
- [Jasper Bärhausen](https://github.com/Iceman422) 
- [Moritz Pacius](https://github.com/mp1621)
- [Ralf Ehli](https://github.com/Ehlikopter)

### :clipboard: Task
> "Entwickeln Sie eine Web-Applikation die innerhalb eines Location-Based-Service eines Karte darstellt. Innerhalb der Karte soll eine Position (oder aktueller Standort) mit ihren Geo-Koordinaten ausgewählt werden können. Über diese Koordinaten soll mittels Reverse-Geocoding der Ort ermittelt und über Wikipedia die enstsprechenden Information zur Örtlichkeit ausgelesen und visualisiert werden" Anschließend soll die Fahrroute von der gegenwärtigen Position zum ausgewählten Ort dargestellt werden.

### Scrum

We use Notion to plan, document and define our Scrum development.

<a href="https://lost-app.notion.site/lost-app/Project-Overview-e555f7cacf4d41b0b00bf365212828bf" style="display:flex">
    <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=100,quality=100/front-static/shared/icons/notion-app-icon-3d.png" alt="notion" width="25" height="25" style="margin-right:5px">
    View Notion page
</a>

## :information_source: More
### :exclamation: Contributing
Please read through our [contributing guidelines](.github/CONTRIBUTING.md).

---
### :pushpin: Task
- Die Web-Applikation soll möglichst gemäß den Vorgaben einer PWA entsprechend (Progressive-Web-Application, mobile first, responsive, ..) umgesetzt werden.
- Die App soll über "React/JSX", sowie über ein User Experience (Mobility/UI) wie "Framework7, Ionic doer Material UI" und dessen Standardkomponenten umgesetzt werden. Die Karten sollen über OpenStreetMap ggf. Leaflet eingebunden werden.
- Bilden Sie dazu kleine Sprint-Teams (ca. 4-7 Personen pro Sprint-Team)und zerelegen sie die Epic in die entsprechenden User-Stories und Sprints (Produkt-Backlog, Sprint-Backlog), so dass die Teams eine gleichmäßige Auslastung haben.
- Definieren Sie einen Scrum-Master (wenn nötig ggf. ein Team von 2 Personen) der das Produkt-Inkrement kontrolliert und dem Team beim Sprint-Inkrement beratend und unterstützend zur Seite steht, die (online)-Kommunikation untereinander aufrecht erhält, das Ziel ständig kontrolliert und den Product-Owner informiert.
- Die fertige Lösung soll ggf. auf einem Github-Repository lauffähig veröffentlicht und auf CD/DVD dem Sekretariat übergeben werden. Der Scrum-Master ist für die vollständige Auslieferung der PWA zum Ende des Vorlesungsquartals oder nach individueller Absprache mit dem Dozenten verantwortlichen.
---
## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "*",
  "type": [
    "pwa",
    "web"
  ],
  "name": "Lost",
  "framework": "react",
  "template": "blank",
  "cssPreProcessor": "scss",
  "bundler": "vite",
  "theming": {
    "customColor": true,
    "color": "#B317C1",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false
}
```

## :warning: Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## :running_woman: NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## PWA

This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)
* [Framework7 React Documentation](https://framework7.io/react/)
* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7