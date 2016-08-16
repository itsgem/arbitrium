import React from 'react';
import tr from 'i18next';
import {createError} from 'utils/error';
import moment from 'moment';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      totalCount: 0,
      created_date_from: null,
      created_date_to: null
    };  }
  componentWillReceiveProps(nextPops) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    let statusCode = [];
    let statusCodeColor = [];
    let statusCodeData = [];
    let statusCount = [];
    let count = 0;
    let graphInfo = nextPops.graphInfo.data;
      for (let index in graphInfo) {
        count = count + graphInfo[index].count;
        if (graphInfo[index].status_code < 300 && graphInfo[index].status_code >= 200) {
          if (((graphInfo[index].status_code - 200) != 0)) {
            statusCount[200] = statusCount[200] ? (statusCount[200] + 2) : 2;
          }

          statusCode[index] = graphInfo[index].status_code;
          statusCodeColor[index] = "rgba(0, 128, 0, " + ( ((graphInfo[index].status_code - 200) == 0) ? 1 : ("0." + (10 - (10 - statusCount[200]) )) ) + ")";
          statusCodeData[index] = graphInfo[index].count;

        } else if (graphInfo[index].status_code < 500 && graphInfo[index].status_code >= 400) {
          if (((graphInfo[index].status_code - 400) != 0)) {
            statusCount[400] = statusCount[400] ? (statusCount[400] + 2) : 2;
          }

          statusCode[index] = graphInfo[index].status_code;
          statusCodeColor[index] = "rgba(0, 0, 255, " + ( ((graphInfo[index].status_code - 400) == 0) ? 1 : ("0." + (10 - (10 - statusCount[400]) )) ) + ")";
          statusCodeData[index] = graphInfo[index].count;

        } else if (graphInfo[index].status_code < 600 && graphInfo[index].status_code >= 500) {
          if (((graphInfo[index].status_code - 500) != 0)) {
            statusCount[500] = statusCount[500] ? (statusCount[500] + 2) : 2;
          }

          statusCode[index] = graphInfo[index].status_code;
          statusCodeColor[index] = "rgba(255, 0, 0, " + ( ((graphInfo[index].status_code - 500) == 0) ? 1 : ("0." + (10 -(10 - statusCount[500]) )) ) + ")";
          statusCodeData[index] = graphInfo[index].count;
        }
      }

      this.setState({
        totalCount: count
      });

      let ctx = document.getElementById("apiCalls");
      let apiCalls = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: statusCode,
        datasets: [
            {
              data: statusCodeData,
              backgroundColor: statusCodeColor
          }]
        }
      });
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    let isState = this;
    $( document ).ready(function() {
      $('#created_date_from .datepicker').datepicker({
          format: 'yyyy-mm-dd',
          startDate: moment(new Date()).add(-1, 'month').format('YYYY-MM-DD'),
          endDate: moment(new Date()).format('YYYY-MM-DD'),
          autoclose: true,
          todayHighlight: true
      });
      $('#created_date_to .datepicker').datepicker({
          format: 'yyyy-mm-dd',
          startDate: moment(new Date()).add(-1, 'month').format('YYYY-MM-DD'),
          endDate: moment(new Date()).format('YYYY-MM-DD'),
          autoclose: true,
          todayHighlight: true
      });
    });
    this.updateDatepicker(isState);
  }
  updateDatepicker(isState) {
    $('#created_date_from .datepicker').change(function(){
      isState.setState({created_date_from: $(this).val()});
      document.getElementById('created_date_from').classList.add('is-dirty');

      if (isState.state.created_date_from > isState.state.created_date_to) {
        $('#created_date_to .datepicker').datepicker('update', moment(isState.state.created_date_from).toDate());
      }

      $('#created_date_to .datepicker').datepicker('setStartDate', moment(isState.state.created_date_from).toDate());
      $('#created_date_to .datepicker').datepicker('setEndDate', moment(new Date()).format('YYYY-MM-DD'));
      if (!isState.state.created_date_to) {
        document.getElementById('created_date_to').classList.remove('is-dirty');
      }
    });
    $('#created_date_to .datepicker').change(function(){
      isState.setState({created_date_to: $(this).val()});
      document.getElementById('created_date_to').classList.add('is-dirty');
    });
  }
  render() {
    let statusCode = this.props.graphInfo.data ? this.props.graphInfo.data : [];
    let totalCount = this.state.totalCount;

    return (
      <div className="mdl-cell mdl-cell--12-col dashboard">
        <div className="date-range">
          <div className="mdl-grid filter-search-bar">
            <div className="mdl-cell mdl-cell--3-col">
              <div id="created_date_from" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input
                  type="text"
                  className="datepicker mdl-textfield__input"
                  id="date_from" ref="date_from"
                  readOnly
                />
                <label className="mdl-textfield__label">{tr.t('LABEL.DATE_CREATED_FROM')}</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div id="created_date_to" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input
                  type="text"
                  className="datepicker mdl-textfield__input"
                  id="date_to" ref="date_to"
                  readOnly
                />
                <label className="mdl-textfield__label">{tr.t('LABEL.DATE_CREATED_TO')}</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col text-right">
              <button onClick={(e) => this.searchList(e) } className="margin-right-10 mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue"><i className="material-icons">search</i>{tr.t('BUTTON.SEARCH')}</button>
              <button onClick={(e) => this.clearSearch(e)} className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"><i className="material-icons">clear</i>{tr.t('BUTTON.CLEAR')}</button>
            </div>
          </div>
        </div>
        <div className="mdl-grid chart">
          <div className="mdl-cell mdl-cell--5-col">
            <h6>{tr.t('CLIENT_DASHBOARD.TITLE.API_CALLS')}</h6>
            <div className="graph-container">
              <canvas id="apiCalls" width="100" height="100"></canvas>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--7-col">
            <h6>{tr.t('CLIENT_DASHBOARD.TITLE.API_CALL_RESPONSE')}</h6>
              {
                statusCode.map(item => {
                  return this.graphInfoPercentage(item, totalCount);
                })
              }
          </div>
          { this.props.loading == false && !Object.keys(statusCode).length &&
            <div className="mdl-cell mdl-cell--7-col">
              <p className="no-data">No data to display</p>
            </div>
          }
        </div>
      </div>
    );
  }
  graphInfoPercentage(data, totalCount) {
    let labelStatus = "";
    if (data.status_code == 200) {
      labelStatus = "OK";
    } else if (data.status_code == 204) {
      labelStatus = "NO CONTENT";
    } else if (data.status_code == 400) {
      labelStatus = "BAD REQUEST";
    } else if (data.status_code == 401) {
      labelStatus = "UNAUTHORIZED";
    } else if (data.status_code == 403) {
      labelStatus = "FORBIDDEN";
    } else if (data.status_code == 404) {
      labelStatus = "NOT FOUND";
    } else if (data.status_code == 500) {
      labelStatus = "INTERNAL SERVER ERROR";
    }

    return (
      <ul className="mdl-grid" key={data.status_code}>
        <li className="mdl-cell mdl-cell--6-col"><h6>{data.status_code}: {labelStatus}</h6></li>
        <li className="mdl-cell mdl-cell--4-col"><hr></hr></li>
        <li className="mdl-cell mdl-cell--2-col"><h4 className="percentage">{ parseFloat((data.count / totalCount) * 100).toFixed(2) }%</h4></li>
      </ul>
    );
  }
  searchList(e) {
    e.preventDefault();

    $('#apiCalls').remove();
    $('.graph-container').append('<canvas id="apiCalls" width="100" height="100"><canvas>');

    let dateFrom = this.state.created_date_from;
    let dateTo = this.state.created_date_to;
    let payload = {
      dateFrom: dateFrom,
      dateTo: dateTo
    }

    this.props.graphReport(payload).catch(createError);
  }

  clearSearch(e) {
    var today = moment(new Date()).format('YYYY-MM-DD');
    e.preventDefault();
    this.refs.date_from.value = "";
    this.refs.date_to.value = "";

    this.setState( {
      created_date_from: null,
      created_date_to: null
    } );

    $('#created_date_from .datepicker').datepicker('setDate', null);
    $('#created_date_from .datepicker').datepicker('setEndDate', today);

    $('#created_date_to .datepicker').datepicker('setDate', null);
    $('#created_date_to .datepicker').datepicker('setStartDate', null);
    $('#created_date_to .datepicker').datepicker('setEndDate', today);

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }

    $('#apiCalls').remove();
    $('.graph-container').append('<canvas id="apiCalls" width="400" height="400"><canvas>');
    this.props.graphReport().catch(createError);
  }

};

export default Main;
