import { Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import LaunchpadLayout from "../../common/layout/launchpad-layout";
class CreateLaunchpadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    const { isLoading } = this.state;
    return (
      <>
        <LaunchpadLayout
          activeTab={"factory"}
          Container={<Spin spinning={isLoading}>hiiii</Spin>}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { common } = state;
  return {
    common,
  };
};

const mapDispatchToProps = (() => ({}))();
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLaunchpadPage);
