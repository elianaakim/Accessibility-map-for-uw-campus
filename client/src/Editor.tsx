import React, { Component } from 'react';
import { Building } from './buildings';


type EditorProps = {
  /** Names of all the buildings that are available to choose. */
  buildings: Array<Building>;

  /** Called to note that the selection has changed. */
  onEndPointChange: (endPoints?: [Building, Building]) => void;
};

type EditorState = {
  // TODO: decide on the state to store
  from?: string;
  to?: string;
};


/** Component that allows the user to edit a marker. */
export class Editor extends Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  doFromChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ from: event.target.value }, this.doUpdateClick);
  }

  doToChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ to: event.target.value }, this.doUpdateClick);
  }

  doUpdateClick = (): void =>{
    const from = this.state.from;
    const to = this.state.to;
    const buildings = this.props.buildings;

    if (from !== undefined && to !== undefined) {
      const fromBuilding = buildings.find((b: Building) => b.longName === from);
      const toBuilding = buildings.find((b: Building) => b.longName === to);

      if (fromBuilding !== undefined && toBuilding !== undefined) {
        this.props.onEndPointChange([fromBuilding, toBuilding]);
      }
    }
  };

  doClearClick = (): void =>
    this.setState({ from: undefined, to: undefined }
    );

  render = (): JSX.Element => {
    // TODO: fill this in
    return (
      <div>
        <label>
          From:
          <select value={this.state.from ?? ''} onChange={this.doFromChange}>
            <option value="">(choose a building)</option>
            {this.props.buildings.map((b: Building) => <option key={b.longName} value={b.longName}>{b.longName}</option>)}
          </select>
        </label>

        <label>
          To:
          <select value={this.state.to ?? ''} onChange={this.doToChange}>
            <option value="">(choose a building)</option>
            {this.props.buildings.map((b: Building) => <option key={b.longName} value={b.longName}>{b.longName}</option>)}
          </select>
        </label>

        <button onClick={this.doClearClick}>Clear</button>
      </div>
    );
  }
}