import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import CustomSearch from "../group/CustomSearch";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {connect} from "react-redux";
import {getAllTourList, updateSelectedRowsAction} from "../../../redux/actions/tourAction";

import './Tours.scss';
import AddTour from "./AddTour";
import UpdateTour from "./UpdateTour";
import DeleteTour from "./DeleteTour";

const tableColumns = [
    {
        dataField: "id",
        text: "ID",
        sort: true,
    },
    {
        dataField: "title",
        text: "Title",

    },
    {
        dataField : "description",
        text: "Description",
        formatter: (cell) => {
            let des = cell;
            return des.length > 200 ?  des.slice(0,100) + "..." : des.slice(0)

        }
    },
    {
        dataField: "schedule",
        text: "Schedule",
    },
    {
        dataField: "dayStart",
        text: "Start Date",
        sort: true,
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
        },
    },
    {
        dataField: "departureFrom",
        text: "Departure",
    },
    {
        dataField: "vehicle",
        text: "Vehicle",
    },
    {
        dataField: "price",
        text: "Price",
        sort: true,
    },
    {
        dataField: "quantity",
        text: "Quantity",
        sort: true,
    },
    {
        dataField: "notes",
        text: "Notes",
        formatter: (cell) => {
            let des = cell;
            return des.length > 200 ?  des.slice(0,100) + "..." : des.slice(0)

        }
    },
    {
        dataField: 'link',
        text: 'Action',
        formatter: (rowContent, row) => {
            const rows={
                id: row.id,
                title: row.title,
                description: row.description,
                schedule: row.schedule,
                dayStart: row.dayStart,
                vehicle: row.vehicle,
                departureFrom: row.departureFrom,
                price: row.price,
                quantity: row.quantity,
                notes: row.notes,

            }
            return (
                <UpdateTour {...rows}/>
            )
        }
    }
];
const Tours = (props) => {
    //========================CALL API AND GET DATA FROM REDUX
    useEffect(() => {
        props.getAllTourList();
    },[])


    //tour list
    let {tourListData, selectedRows} = props.tourData;
    // console.log(props.tourData);

    const [tourDataState, setTourDataState] = useState([]);

    useEffect(()=>{
        setTourDataState(tourListData)
    },[tourListData])

    //===========================Handle Select checkbox
    const handleOnSelect = (row, isSelect) =>{
        if(isSelect){
            selectedRows = [...selectedRows, row.id]
        } else {
            selectedRows = selectedRows.filter(x => x !== row.id)
        }
        console.log(selectedRows);
        props.updateSelectedRowsAction(selectedRows);
    }

    const handleOnSelectAll = (isSelect,rows) => {
        let ids = rows.map(row => row.id);
        if(isSelect){
            selectedRows = ids;
        }else {
            selectedRows = [];
        }
        props.updateSelectedRowsAction(selectedRows);
    }
    ///handle change table
    const handleTableChange = async (type, {page, sizePerPage =5, sortField, sortOrder, searchText}) =>{
        if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
              sortField = 'id'
              sortOrder = 'desc';
        }
        props.getAllTourList(page, sizePerPage, sortField, sortOrder, searchText);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h1">Tours Management</CardTitle>
                <h6 className="card-subtitle text-muted">

                </h6>
            </CardHeader>
            <CardBody>
                <ToolkitProvider
                    keyField="id"
                    data={tourDataState}
                    columns={tableColumns}
                    search
                >
                    {
                        props => (
                            <>
                                <Row style={{ alignItems: "flex-end" }}>
                                    <Col xs="9">
                                        <CustomSearch {...props.searchProps} />
                                    </Col>
                                    <Col xs="3" style={{ paddingBottom: 20 }}>
                                        <div className="float-right pull-right">
                                            <AddTour/>
                                            <DeleteTour selectedRows = {selectedRows}/>
                                            {/*<DeleteGroup selectedRows={selectedRows}/>*/}
                                        </div>
                                    </Col>
                                </Row>
                                <BootstrapTable
                                    {...props.baseProps}
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
                                        sizePerPage: 5,
                                        sizePerPageList: [5, 10, 25, 50]
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

const mapGlobalStateToProps = (state) => ({
    tourData: state.tourReducer,
    // selectedRows: state.tourReducer
})
const mapDispatchToProps = {
    getAllTourList,
    updateSelectedRowsAction
}
export default connect(mapGlobalStateToProps, mapDispatchToProps) (Tours);
