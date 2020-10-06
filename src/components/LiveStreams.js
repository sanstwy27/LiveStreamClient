import React, { Component } from 'react';
import axios from 'axios';
import '../css/LiveStreams.scss';
import Pagination from './Pagination';
import StreamCard from './StreamCard';

class App extends Component {
  constructor() {
    super();
    this.state = { currentStreams: [], currentPage: null, totalStreams: null, totalPages: null }
    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.updateStreamItems(1, 18);
  }

  updateStreamItems(page, offset) {
    axios.get(`http://localhost:8080/api/twitch/slist/${page}/${offset}`)
      .then(res => {
        this.setState({ currentStreams: res.data.data, totalStreams: res.data.total });
      })
  }

  onPageChanged = data => {
    const { allStreams } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    if( currentPage !== this.state.currentPage) {
      const offset = (currentPage - 1) * pageLimit;
      const currentStreams = allStreams.slice(offset, offset + pageLimit);
      this.setState({ currentPage, currentStreams, totalPages });
    }
  }

  onChangePage(page, offset) {
    // update state with new page of items
    this.updateStreamItems(page, offset);
  }

  render() {
    const { currentStreams, currentPage, totalStreams, totalPages } = this.state;

    if (!totalStreams || totalStreams === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="live-container">
        <div className="pagination-container d-flex flex-row align-items-center">
          <div className="d-flex flex-row align-items-center">
            <h2 className={headerClass}>
              <strong className="text-secondary">{totalStreams}</strong> {totalStreams <= 1 ? "Stream" : "Streams"}
            </h2>
            {currentPage && (
              <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
              </span>
            )}
          </div>
          <div className="d-flex flex-row py-3 align-items-center">
            <Pagination totalItems={totalStreams} onChangePage={this.onChangePage}/>
          </div>
        </div>
        <div className="flex-container">
          {currentStreams.map(stream => 
            <div key={stream.id} className="item auto">
              <StreamCard stream={stream} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;