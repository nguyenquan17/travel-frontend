import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Container,Row, Col } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import {getAllGroup ,updateSelectedRowsAction} from "../../../redux/actions/groupsAction";
import { connect } from 'react-redux';
import AddGroup from "./AddGroup";
import UpdateGroup from "./UpdateGroup";
import DeleteGroup from "./DeleteGroup";
import CustomSearch from "./CustomSearch";

const tableColumns = [
  {
    dataField: "id",
    text: "ID",
    sort: true
  },
  {
    dataField: "name",
    text: "Tên Group",
    sort: true
  },
  {
    dataField: "totalMember",
    text: "Số lượng thành viên",
    sort: true
  },
  {
    dataField: 'link',
    text: 'Action',
    formatter: (rowContent, row) => {
      const rows={
        id: row.id,
        name: row.name,
        totalMember: row.totalMember
      }
      return (    
        <UpdateGroup {...rows}/>
      )
    }
}
];
const GroupsTable = (props) => {

  //paging,sort,...
  const {page, size, totalElements} = props.groups
  console.log("Page: " + page, "Size:" + size, "Total:" + totalElements);

  //selected array
  let {selectedRows} = props.selectedRows;
  // console.log(selectedRows);

  //group List
  const {groups} = props.groups;
  // console.log(props.groups);

  const [groupState, setGroupState] = useState([]);

  useEffect(()=>{
    setGroupState(groups)
  },[groups])

  //call api
  useEffect(()=>{
    props.getAllGroup(page,size);
  },[])


  ///handle change table
  const handleTableChange = async (type, {page, sizePerPage, sortField, sortOrder, searchText}) =>{
    // // sort
    // if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
    //   sortField = 'id'
    //   sortOrder = 'desc';
    // }
     props.getAllGroup(page, sizePerPage, sortField, sortOrder, searchText);
  }

  //handle change select
  const handleOnSelect = (row, isSelect) => {
    // let selected = props.selectedRows;
    if (isSelect) {
      selectedRows = [...selectedRows, row.id]
    } else {
      selectedRows = selectedRows.filter(x => x !== row.id)
    }
    console.log(selectedRows);
    props.updateSelectedRowsAction(selectedRows);
  }
  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      selectedRows = ids;
    }
    else{
      selectedRows = [];
    }
    props.updateSelectedRowsAction(selectedRows);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">Pagination</CardTitle>
        <h6 className="card-subtitle text-muted">
          Pagination by react-bootstrap-table2
        </h6>
      </CardHeader>
      <CardBody>
        <ToolkitProvider
                  keyField="id"
                  data={groupState}
                  columns={tableColumns}
                  search
        >
                {
                  toolkitprops => (
                    <>
                <Row style={{ alignItems: "flex-end" }}>
                  <Col xs="9">
                    <CustomSearch {...toolkitprops.searchProps} />
                  </Col>
                  <Col xs="3" style={{ paddingBottom: 20 }}>
                    <div className="float-right pull-right">
                      <AddGroup/>
                      <DeleteGroup selectedRows={selectedRows}/>
                    </div>
                  </Col>
                </Row>
                <BootstrapTable
                  {...toolkitprops.baseProps}
                  striped
                  hover
                  remote
                  // keyField="id" //id or name
                  // data={groupState}
                  // columns={tableColumns}
                  selectRow={{
                    mode: "checkbox",
                    // clickToSelect: true,
                    selected: selectedRows,
                    onSelect: handleOnSelect,
                    onSelectAll: handleOnSelectAll
                  }}
                  bootstrap4
                  bordered={false}
                  pagination={paginationFactory({
                    sizePerPage: size,
                    totalSize: totalElements,
                    page: page,
                    nextPageText: '>',
                    prePageText: '<',
                    withFirstAndLast: false,
                    alwaysShowAllBtns: true,

                    // hideSizePerPage: true
                  })}
                  onTableChange={handleTableChange}
                  />
              </>
            )
          }
        </ToolkitProvider>
      </CardBody>
    </Card>
  );
};

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Pagination</h1>

    <GroupsTable />
  </Container>
);

const mapGlobalStateToProps = (state) =>({
  selectedRows: state.groupsReducer,
  groups :state.groupsReducer,
  // size: state.groupsReducer,
  // page: state.groupsReducer,
  // totalElement: state.groupsReducer,
  // sortField: state.groupsReducer,
  // sortType: state.groupsReducer
})
const mapDispatchToProps = {
  getAllGroup,
  updateSelectedRowsAction
}
export default connect(mapGlobalStateToProps, mapDispatchToProps) (GroupsTable);