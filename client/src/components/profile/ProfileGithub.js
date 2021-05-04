import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'

const ProfileGithub= ({ username, repos, getGithubRepos }) => {

    useEffect(() => {
        getGithubRepos(username)
    }, [username])

    return (
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {
              repos !== null ? (
                repos.map(({ html_url, name, description, forks, watchers, stargazers_count }) => (
                    <div className="repo bg-white p-1 my-1">
                        <div>
                        <h4><a href={html_url} target="_blank"
                            rel="noopener noreferrer">{name}</a></h4>
                        <p>{description}</p>
                        </div>
                        <div>
                        <ul>
                            <li className="badge badge-primary">Stars: {stargazers_count}</li>
                            <li className="badge badge-dark">Watchers: {watchers}</li>
                            <li className="badge badge-light">Forks: {forks}</li>
                        </ul>
                        </div>
                    </div>
                ))
              ) : 
              <Spinner />
          }
        </div>
    )
}
ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
}

const mapStateToProps= state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
