import {Component} from "@angular/core";

@Component({
  selector: "app-gallery",
  templateUrl: "gallery.component.html",
  styleUrls: ["gallery.component.scss"]
})
export class GalleryComponent {

  routes = ["assets/gym1.jpg", "assets/gym2.jpg", "assets/gym3.jpg",
    "assets/gym4.jpg"]
}
