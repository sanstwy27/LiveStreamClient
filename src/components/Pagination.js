import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid'
import '../css/Pagination.scss'

const propTypes = {
    totalItems: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 18
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.lang !== prevProps.lang) {
            this.setPage(this.props.initialPage);
        }
      }

    componentDidMount() {
        // set page if items array isn't empty
        if (this.props.totalItems) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var { totalItems, pageSize } = this.props;
        var pager = this.state.pager;

        var totalPages = Math.ceil(totalItems / pageSize);
        // get new pager object for specified page
        if (page < 1) {
            pager = this.getPager(totalItems, 1, pageSize);
        } else if(page > totalPages) {
            pager = this.getPager(totalItems, totalPages, pageSize);
        } else {
            pager = this.getPager(totalItems, page, pageSize);
        }

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(page, pageSize);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className="pagination-nav">
                <nav aria-label="Streams Pagination">
                    <ul className="pagination">
                        <li key={uuid()} className={pager.currentPage === 1 ? 'disabled' : ''}>
                            <a className={'page-link page-item-first'} onClick={() => this.setPage(1)} href="/#">First</a>
                        </li>
                        <li key={uuid()} className={pager.currentPage === 1 ? 'disabled' : ''}>
                            <a className={'page-link page-item-previous'} onClick={() => this.setPage(pager.currentPage - 1)} href="/#">Previous</a>
                        </li>
                    </ul>
                    <ul className="pagination">
                        {pager.pages.map((page, index) =>
                            <li key={uuid()} className={`page-item${pager.currentPage === page ? " active" : ""}`}>
                                <a className={'page-link'} onClick={() => this.setPage(page)} href="/#">{page}</a>
                            </li>
                        )}
                    </ul>
                    <ul className="pagination">
                        <li key={uuid()} className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                            <a className={'page-link page-item-next'} onClick={() => this.setPage(pager.currentPage + 1)} href="/#">Next</a>
                        </li>
                        <li key={uuid()} className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                            <a className={'page-link page-item-last'} onClick={() => this.setPage(pager.totalPages)} href="/#">Last</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;