import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Menu, Dropdown, Icon } from 'antd';

class ClassIndividual extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      console.log("individualdata",this.props.individualData)
  }

  onSelectChange(selectedRowKeys, selectedRows){
     console.log("selectedRowKeys, selectedRows",selectedRowKeys, selectedRows)
  }


  render(){

      const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              Play Project
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              Stop Platback
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              Stop Download
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              Pause Platback
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              Download Project
            </a>
          </Menu.Item>
        </Menu>
      );

      const columns = [
        {
          title: 'Name',
          render: (item) => { return <a>{item.name}</a> },
        },
        {
          title: 'Status',
          render: (item) => { return <a>{item.status}</a> },
        },
      ];

      const rowSelection = {
            onChange: this.onSelectChange.bind(this),
      };

      return(
         <div className="dashboard animated fadeIn">
            <div className="row" style={{textAlign: 'right', padding: '30px', display: 'block' }}>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  Select Action <Icon type="down" />
                </a>
              </Dropdown>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Table 
                      rowKey={(item) => { return item.id }} 
                      rowSelection={rowSelection} 
                      columns={columns} 
                      dataSource={this.props.individualData} />
                </div>
            </div>
         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    individualData:state.individualData.individualdata
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ClassIndividual);