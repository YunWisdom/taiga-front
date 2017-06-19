import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as Immutable from "immutable";
import * as _ from "lodash";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { StorageService} from "../../ts/modules/base/storage";
import {FiltersRemoteStorageService} from "../components/filter/filter-remote.service";
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./detail.actions";

@Injectable()
export class DetailEffects {
    @Effect()
    fetchDetailUserStory$: Observable<Action> = this.actions$
        .ofType("FETCH_DETAIL_USER_STORY")
        .map(toPayload)
        .switchMap(({projectId, ref}) => {
          return this.rs.userstories.getByRef(projectId, ref).map((userstory) => {
              return new actions.SetDetailUserStoryAction(userstory.data);
          });
        });

    @Effect()
    fetchDetailUserStoryCustomAttributes$: Observable<Action> = this.actions$
        .ofType("FETCH_DETAIL_USER_STORY_CUSTOM_ATTRIBUTES")
        .map(toPayload)
        .switchMap((usId) => {
          return this.rs.customAttributesValues.get_userstory(usId).map((values) => {
              return new actions.SetDetailUserStoryCustomAttributesAction(values.data.get('attributes_values'));
          });
        });

    constructor(private actions$: Actions,
                private rs: ResourcesService,
                private storage: StorageService,
                private filtersRemoteStorage: FiltersRemoteStorageService) { }
}
