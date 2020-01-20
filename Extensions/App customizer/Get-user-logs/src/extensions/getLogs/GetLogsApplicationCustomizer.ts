import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'GetLogsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GetLogsApplicationCustomizer';

import * as moment from 'moment';

import { sp } from "@pnp/sp/presets/all";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGetLogsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GetLogsApplicationCustomizer
  extends BaseApplicationCustomizer<IGetLogsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

    sp.web.currentUser.get().then(ExternalUser => {
      const externalUserEmail = ExternalUser.Email

      sp.web.lists.getByTitle("Requests").items.get().then((request) => {
        request.map((data) => {
          if (externalUserEmail == data.Email) {
            sp.web.lists.getByTitle("ExternalUsersLogs").items.add({
              requestDate: moment(data.RequestDate).format('dddd, DD/MM/YYYY'),
              request: data.Request,
              ReferenceNumberIn: data.ReferenceNumberIn,
              Email: data.Email,
              Fullname: data.Fullname,
              LastLogin: moment().format('dddd, DD/MM/YYYY, h:mm:ss a')
            })
          }
        })
      })
    }).then(_ => console.log('works')).catch(_ => console.log('extension not working'))

    return Promise.resolve();
  }
}
