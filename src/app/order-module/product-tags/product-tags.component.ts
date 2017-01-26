import {Component, Input, OnInit} from '@angular/core';

import {ITag} from '../../models/tag';
import {TagsService} from '../../services-module/tags.service';

@Component( {
    selector: 'oms-product-tags',
    templateUrl: './product-tags.component.html'
} )
export class ProductTagsComponent implements OnInit {
    @Input() private productKey: string;
    private errorMessage: string;
    private tags: ITag[];

    constructor(private tagsService: TagsService) {}

    ngOnInit() {
        this.tagsService.getTagsForProduct( this.productKey )
            .subscribe(
                (data: ITag[]) => this.tags = <ITag[]>data,
                (error: any) => this.errorMessage = <any>error
            );
    }
}
