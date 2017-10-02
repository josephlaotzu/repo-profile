import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchForm from '../../components/SearchForm';
import * as searchActions from '../../actions/searchActions';
export class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: Object.assign({}, props.query),
      placeholder: 'Username',
      errors: {},
      saving: false
    };

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  updateSearchQuery(event) {
    const field = event.target.name;
    let query = Object.assign({}, this.state.query);
    query[field] = event.target.value;
    return this.setState({ query: query });
  }

  doSearch(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.loadProfile(this.state.query)
      .then(() => { this.setState({ saving: false }); })
      .catch(error => {
        alert(error);
        this.setState({ saving: false });
      });
  }

  renderProfile() {
    const { profile } = this.props;
    return profile.map(function (data) {
      return (<div key={data.id} >
                <img src={data.avatar_url} alt="profile photo"/>
                <h2>{data.name}</h2>
              </div>);
    });
  }
  render() {

    return (
      <div>
        <SearchForm
          onSave={this.doSearch}
          onChange={this.updateSearchQuery}
          query={this.state.query}
          placeholder={this.state.placeholder}
          errors={this.state.errors}
          saving={this.state.saving} />
        {!this.props.loading && this.renderProfile()}
      </div>
    );
  }
}

HomePage.propTypes = {
  query: PropTypes.object,
  profile: PropTypes.array,
  placeholder: PropTypes.string,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  let query = state.query ? state.query : { keyword: '', repo: '' };
  let profile = state.search ? [state.search] : [];
  return {
    query: { keyword: query.keyword, repo: query.repo },
    profile: profile,
    loading: state.ajaxCallsInProgress > 0
  };
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(searchActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);