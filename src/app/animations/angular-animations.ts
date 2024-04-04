import { animate, style, transition, trigger } from "@angular/animations";

export const deleteItem = trigger('deleteFromList', [
  transition(':leave', [
    animate(250, style({
      opacity: 0,
      transform: 'translateX(100%)',
      transition: 'all .25s'
    }))
  ])
]);
