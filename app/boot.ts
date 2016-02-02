import {bootstrap}    from "angular2/platform/browser";
import {MainComponent} from "./main/main.component";
import {MenuLessonService} from "./menu/menu_lesson/menu_lesson.service";

bootstrap(MainComponent, [MenuLessonService]);
