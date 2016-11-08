import {Component, Input, OnInit} from '@angular/core';

import {ITag} from '../../models/tag';
import {TagsService} from '../../services/tags.service';

@Component( {
    selector: 'oms-product-tags',
    templateUrl: './product-tags.component.html',
    styleUrls: ['product-tags.component.scss']
} )
export class ProductTagsComponent implements OnInit {
    @Input() productKey: string;
    errorMessage: string;
    tags: ITag[];

    constructor(private tagsService: TagsService) {}

    ngOnInit() {
        this.tagsService.getTagsForProduct( this.productKey )
            .subscribe(
                (data: ITag[]) => this.tags = <ITag[]>data,
                (error: any) => this.errorMessage = <any>error
            );
    }
}
