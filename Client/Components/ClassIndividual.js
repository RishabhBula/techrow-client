import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Menu, Dropdown, Icon, Badge } from 'antd';

import {setSelecteddevices} from '../../actions/setSelecteddevices';

class ClassIndividual extends Component{
	constructor(props){
		super(props);
    this.state = {
      selecteddevices:[]
    }
	}
  
  componentDidMount(){
      
  }

  onSelectChange(selectedRowKeys, selectedRows){
     console.log("selectedRowKeys, selectedRows",selectedRowKeys, selectedRows)
     this.setState({selecteddevices:selectedRowKeys});
     this.props.setSelecteddevices(selectedRowKeys)
  }

  actions(type){
      // const socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      switch(type) {
        case 'play':
          // code block
          console.log("play")
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.selectedDevices, 'play', [this.props.theaterData.headjackProjectId]);
          break;
        case 'resume':
          // code block
          console.log("resume")
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.selectedDevices, 'resume', []);
          break;
        case 'stop':
          // code block
          console.log("stop")
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.selectedDevices, 'stop', []);
          break;
        case 'cancel':
          // code block
          console.log("cancel")
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.selectedDevices, 'cancel', [this.props.theaterData.headjackProjectId]);
          break;
        case 'pause':
          // code block
          console.log("pause")
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.selectedDevices, 'pause', []);
          break;
        case 'download':
          // code block
          console.log("download")
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.selectedDevices, 'download', [this.props.theaterData.headjackProjectId]);
          break;
        default:
          // code block
      }
  }


  render(){
      // console.log("this.props++++====++++++",this.props)
      const menu = (
        <Menu onClick={(e) =>{ this.actions(e.key) }}>
          <Menu.Item key="play" disabled={this.props.selectedDevices.length==0 ? true : false}>
            <a rel="noopener noreferrer">
              Play Project
            </a>
          </Menu.Item>
          <Menu.Item key="pause" disabled={this.props.selectedDevices.length==0 ? true : false}>
            <a rel="noopener noreferrer">
              Pause Playback
            </a>
          </Menu.Item>
          <Menu.Item key="resume" disabled={this.props.selectedDevices.length==0 ? true : false}>
            <a rel="noopener noreferrer">
              Resume Playback
            </a>
          </Menu.Item>
          <Menu.Item key="stop" disabled={this.props.selectedDevices.length==0 ? true : false}>
            <a rel="noopener noreferrer">
              Stop Playback
            </a>
          </Menu.Item>
          <Menu.Item key="download" disabled={this.props.selectedDevices.length==0 ? true : false}>
            <a rel="noopener noreferrer">
              Download Project
            </a>
          </Menu.Item>
          <Menu.Item key="cancel" disabled={this.props.selectedDevices.length==0 ? true : false}>
            <a rel="noopener noreferrer">
              Stop Download
            </a>
          </Menu.Item>
        </Menu>
      );

      const columns = [
        {
          title: 'Name',
          render: (item) => { return <a>{item.persistentData.deviceModel}</a> },
        },
        {
          title: 'Status',
          render: (item) => { return <a>{item.status.name=='idle'? <Badge color="#B1F543" text="Connected"/> : <Badge color="blue" text={item.status.name}/> }</a> },
        },
      ];

      const rowSelection = {
            selectedRowKeys:this.props.selectedDevices,
            onChange: this.onSelectChange.bind(this),
      };

      return(
         <div className="dashboard individual-mode animated fadeIn">
            <div className="row" style={{textAlign: 'right', padding: '30px', display: 'block' }}>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  Select Action <Icon type="down" />
                </a>
              </Dropdown>
            </div>
            <div className="headset-list">
              <Table locale={{ emptyText: ( <span>Waiting for first device to connect.</span> ) }}
                rowKey={(item) => { return item.id }} 
                rowSelection={rowSelection}
                columns={columns} 
                pagination={{ hideOnSinglePage: true,pageSize: 20 }}
                dataSource={this.props.individualData} />
            </div>
         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    individualData:state.individualData.individualdata,
    theaterData:state.theaterData.theaterdata,
    userData:state.userData,
    selectedDevices:state.selectedDevices.selecteddevices
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setSelecteddevices:setSelecteddevices }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ClassIndividual);