import {Component, Input} from '@angular/core';
import {ITag} from '../tag';

@Component({
  selector: 'oms-product-tags',
  templateUrl: './product-tags.component.html',
  styleUrls: ['./product-tags.component.css']
})
export class ProductTagsComponent {
  @Input() allTags: ITag[];
  @Input() tags: any[];

  getLabelTag(currentTag: string): string {
    for(let tag of this.allTags) {
      if (tag.$key === currentTag) {
        return tag.name;
      }
    }
    return '';
  }

}
