export class SampleProjectsData {

  static projects = [
    {
      "label": "Projects",
      "data": "proj",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "selectable": false,
      "children": [{
        "label": "Agile Times",
        "selectable": false,
        "data": "agile",
        "expandedIcon": "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "children": [
          {"label": "Frontend", "icon": "fa fa-chrome", "data": "fe"},
          {"label": "Backend", "icon": "fa fa-cloud", "data": "be"},
          {"label": "Operations", "icon": "fa fa-cogs", "data": "ops"}
        ]
      },
        {
          "label": "Mobile App",
          "data": "mobile",
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "selectable": false,
          "children": [
            {"label": "Frontend", "icon": "fa fa-chrome", "data": "fe"},
            {"label": "Backend", "icon": "fa fa-cloud", "data": "be"},
            {"label": "Operations", "icon": "fa fa-cogs", "data": "ops"}
          ]
        }]


    }
  ]
}
