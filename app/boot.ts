import {bootstrap}    from "angular2/platform/browser";
import {MainComponent} from "./main/main.component";
import {MenuLessonService} from "./menu/menu-lesson/menu-lesson.service";
bootstrap(MainComponent, [MenuLessonService]);
