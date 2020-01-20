import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SliderWebpartWebPartStrings';
import SliderWebpart from './components/SliderWebpart';
import { ISliderWebpartProps } from './components/ISliderWebpartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base'
import { IDigestCache, DigestCache } from '@microsoft/sp-http';


export interface ISliderWebpartWebPartProps {
  description: string;
  context: IWebPartContext
  queryString: string;
}

export default class SliderWebpartWebPart extends BaseClientSideWebPart<ISliderWebpartWebPartProps> {

  public digest: string = "";

  public constructor(context: IWebPartContext) {
    super();
  }

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
      digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {
        // use the digest here
        this.digest = digest;
        resolve();
      });
    });
  }


  public render(): void {
    const element: React.ReactElement<ISliderWebpartProps> = React.createElement(
      SliderWebpart,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
