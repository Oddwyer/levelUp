import PageWrapper from './PageWrapper';

const Dashboard = ({ onLogout }) => (
  <PageWrapper>
    <div className="auth-card">
      <h2 className="auth-title">Welcome!</h2>
      <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>You have successfully logged in.</p>
      <button
        onClick={onLogout}
        className="btn-primary"
      >
        Logout
      </button>
    </div>
  </PageWrapper>
);

export default Dashboard;