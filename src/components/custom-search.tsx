
// import SearchSource from "@arcgis/core/widgets/Search/SearchSource.js";



// const customSearchSource = new SearchSource({
//     placeholder: "example: 8 Boulevard du Port",
//     // Provide a getSuggestions method
//     // to provide suggestions to the Search widget
//     getSuggestions: (params) => {
//       // You can request data from a
//       // third-party source to find some
//       // suggestions with provided suggestTerm
//       // the user types in the Search widget
//       return esriRequest(url + "search/", {
//         query: {
//           q: params.suggestTerm.replace(/ /g, "+"),
//           limit: 6,
//           lat: view.center.latitude,
//           lon: view.center.longitude
//         },
//         responseType: "json"
//       }).then((results) => {
//         // Return Suggestion results to display
//         // in the Search widget
//         return results.data.features.map((feature) => {
//           return {
//             key: "name",
//             text: feature.properties.label,
//             sourceIndex: params.sourceIndex
//           };
//         });
//       });
//     },
//     // Provide a getResults method to find
//     // results from the suggestions
//     getResults: (params) => {
//       // If the Search widget passes the current location,
//       // you can use this in your own custom source
//       const operation = params.location ? "reverse/" : "search/";
//       let query = {};
//       // You can perform a different query if a location
//       // is provided
//       if (params.location) {
//         query.lat = params.location.latitude;
//         query.lon = params.location.longitude;
//       } else {
//         query.q = params.suggestResult.text.replace(/ /g, "+");
//         query.limit = 6;
//       }
//       return esriRequest(url + operation, {
//         query: query,
//         responseType: "json"
//       }).then((results) => {
//         // Parse the results of your custom search
//         const searchResults = results.data.features.map((feature) => {
//           // Create a Graphic the Search widget can display
//           const graphic = new Graphic({
//             geometry: new Point({
//               x: feature.geometry.coordinates[0],
//               y: feature.geometry.coordinates[1]
//             }),
//             attributes: feature.properties
//           });
//           // Optionally, you can provide an extent for
//           // a point result, so the view can zoom to it
//           const buffer = geometryEngine.geodesicBuffer(graphic.geometry, 100, "meters");
//           // Return a Search Result
//           const searchResult = {
//             extent: buffer.extent,
//             feature: graphic,
//             name: feature.properties.label
//           };
//           return searchResult;
//         });
  
//         // Return an array of Search Results
//         return searchResults;
//       });
//     }
//   });