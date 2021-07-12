import { withRemoteService } from 'ati-remote-service';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { closeAccountModal, closeCashModal, closeQRCodeModal, closeQueueModal, closeTotalModal, getDetailBalance, getDetailDataChart, getEndDate, getFilterStatisticType, getListLastTransaction, getListTotalTransaction, getStartDate, openAccountModal, openCashModal, openQRCodeModal, openQueueModal, openTotalModal } from '../../modules/dashboard/store/dashboard-action';
import { openDepositModal } from '../../modules/history/store/deposit-cash-balance/deposit-cash-action';
import { openWithdrawModal } from '../../modules/history/store/withdraw-cash-balance/withdraw-cash-action';
import { navigate } from './../../common/store/action/general-action';
import CONSTANTS from './../../common/utils/Constants';
import DashboardComponent from './../../modules/dashboard/component/dashboard-component';

const chartData = [
    {
        key: 'Success', strokeColor: '#11bff2', fillAreaColor: '#dbf7ff', areaChartType: 'monotone',
    },
    {
        key: 'Failed', strokeColor: '#ff3838', fillAreaColor: '#ffd1d1', areaChartType: 'monotone',
    },
];

const dataFilterStatistic = [
    { filterStatisticType: 'today' },
    { filterStatisticType: 'weekly' },
    { filterStatisticType: 'monthly' },
    { filterStatisticType: 'annual' },
];

class DashboardPage extends Component {

    componentDidMount() {
        const filter = this.props.filterStatisticType;
        this.props.getDetailDataChart(filter);
        this.props.getListTotalTransaction();
        this.props.getListLastTransaction();
        this.props.getDetailBalance();
    }

    changeStartDate = (date) => {
        this.props.getStartDate(date);
    }

    changeEndDate = (date) => {
        this.props.getEndDate(date);
    }

    clickRefresh = () => {
    };

    changeFilterStatistic = (active) => {
        const filter = active.filterStatisticType;
        this.props.getFilterStatisticType(filter);
        this.props.getDetailDataChart(filter);
    }

    createColumns = () => {
        const columns = [{
            title: <FormattedMessage id="label.type.transaction" />,
            dataIndex: 'type',
            key: 'type',
            fixed: false,
            width: 100,
        }, {
            title: <FormattedMessage id="label.date" />,
            dataIndex: 'date',
            key: 'date',
            fixed: false,
        }, {
            title: <FormattedMessage id="label.status" />,
            dataIndex: 'status',
            key: 'status',
            fixed: false,
            width: 100,
            render: text => this.renderStyle(text),
        }, {
            title: <FormattedMessage id="label.description" />,
            dataIndex: 'description',
            key: 'description',
            fixed: false,
        }, {
            title: <FormattedMessage id="label.action" />,
            dataIndex: 'action',
            key: 'action',
            fixed: false,
            render: (text, record) => this.renderAction(record),
        }];
        return columns;
    }

    columnsTotalTransaction = () => {
        const columns = [{
            title: <FormattedMessage id="label.type.transaction" />,
            dataIndex: 'type',
            key: 'type',
            fixed: false,
        }, {
            title: <FormattedMessage id="label.nominal" />,
            dataIndex: 'nominal',
            key: 'nominal',
            fixed: false,
        }, {
            title: <FormattedMessage id="label.date" />,
            dataIndex: 'date',
            key: 'date',
            fixed: false,
        }, {
            title: <FormattedMessage id="label.status" />,
            dataIndex: 'status',
            key: 'status',
            fixed: false,
            width: 100,
            render: (text, record) => this.renderStyle(text),
        }];
        return columns;
    }

    detailTransaction = record => (
        <a
            style={{ textDecoration: 'underline' }}
            id="details"
            onClick={() => {
                this.props.navigate(CONSTANTS.HISTORY_MENU_KEY);
                this.props.closeAccountModal();
            }}
        >
            <FormattedMessage id="label.history.transaction.detail" />
        </a>
    )

    renderStyle = text => (
        <span className={`active-background ${text}`} >
            {text}
        </span>
    )

    renderAction = record => (
        <span>
            {this.detailTransaction(record)}
        </span>
    )

    render() {
        return (
            <DashboardComponent
                {...this.props}
                refresh={this.clickRefresh}
                columns={this.createColumns()}
                columnsTotalTransaction={this.columnsTotalTransaction()}
                list={this.props.listDetailBalance}
                listTotalTransaction={this.props.listTotalTransaction}
                dataTransaction={this.props.listLastTransaction}
                changeStartDate={this.changeStartDate}
                changeEndDate={this.changeEndDate}
                filterByDate={this.filterByDate}
                changeFilterStatistic={this.changeFilterStatistic}
                dataFilterStatistic={dataFilterStatistic}
                dataSource={this.props.chartTransaction}
                chartData={chartData}
            />
        );
    }
}

const mapStateToProps = state => ({
    ...state.dashboard,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
    openDepositModal,
    openWithdrawModal,
    getDetailDataChart,
    getListTotalTransaction,
    getListLastTransaction,
    getDetailBalance,
    openQRCodeModal,
    closeQRCodeModal,
    openAccountModal,
    closeAccountModal,
    openCashModal,
    closeCashModal,
    openTotalModal,
    closeTotalModal,
    openQueueModal,
    closeQueueModal,
    getFilterStatisticType,
    getStartDate,
    getEndDate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
export default withRemoteService(page);