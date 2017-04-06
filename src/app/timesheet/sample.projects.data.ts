export class SampleProjectsData {

  static projects = [
    {
      "label": "Projects",
      "data": "proj",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "selectable": false,
      "children": [{
        "label": "Agile Times",
        "selectable": false,
        "data": "agile",
        "expandedIcon": "fa-folder-open",
        "collapsedIcon": "fa-folder",
        "children": [
          {"label": "Frontend", "icon": "fa-chrome", "data": "fe"},
          {"label": "Backend", "icon": "fa-cloud", "data": "be"},
          {"label": "Operations", "icon": "fa-cogs", "data": "ops"}
        ]
      },
        {
          "label": "Mobile App",
          "data": "mobile",
          "expandedIcon": "fa-folder-open",
          "collapsedIcon": "fa-folder",
          "selectable": false,
          "children": [
            {"label": "Frontend", "icon": "fa-chrome", "data": "fe"},
            {"label": "Backend", "icon": "fa-cloud", "data": "be"},
            {"label": "Operations", "icon": "fa-cogs", "data": "ops"}
          ]
        }]


    }
  ]
}
