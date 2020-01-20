import * as React from 'react';
import styles from './SliderWebpart.module.scss';
import { ISliderWebpartProps } from './ISliderWebpartProps';
import { Islider } from '../models/Islider'
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";

import SimpleImageSlider from "react-simple-image-slider";

export default class SliderWebpart extends React.Component<ISliderWebpartProps, Islider> {

  constructor(props) {
    super(props)

    this.state = {
      listItems: [{}],
      listItems2: [{}],
      listItems3: [{}]
    }

  }

  async componentDidMount() {
    sp.web.lists.getByTitle("SliderContent").items.get().then((item: any) => {
      this.setState({
        listItems: item
      }, () => console.log(this.state.listItems));
    });

    sp.web.lists.getByTitle("SliderContent2").items.get().then((item: any) => {
      this.setState({
        listItems2: item
      }, () => console.log(this.state.listItems));
    });

    sp.web.lists.getByTitle("slderContent3").items.get().then((item: any) => {
      this.setState({
        listItems3: item
      }, () => console.log(this.state.listItems));
    });
  }

  public render(): React.ReactElement<ISliderWebpartProps> {

    const { listItems, listItems2, listItems3 } = this.state
    const data = []
    const data2 = []
    const data3 = []


    listItems.map(item => {
      if (item['Title'] == undefined) {
        return false
      }
      data.push({ url: item['Title'] })
    })

    listItems2.map(item => {
      if (item['Title'] == undefined) {
        return false
      }
      data2.push({ url: item['Title'] })
    })

    listItems3.map(item => {
      if (item['Title'] == undefined) {
        return false
      }
      data3.push({ url: item['Title'] })
    })

    return (
      <div className={styles.sliderWebpart} >
        <div>
          <SimpleImageSlider
            width={750}
            height={504}
            images={data}
          />
          <SimpleImageSlider
            width={750}
            height={504}
            images={data2}
          />
          <SimpleImageSlider
            width={750}
            height={504}
            images={data3}
          />
        </div>
      </div>
    );
  }
}
