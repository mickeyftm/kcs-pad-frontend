import { Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import "./../../assets/css/create-launchpad.css";
import LaunchpadLayout from "../../common/layout/launchpad-layout";
import CreateLaunchpadComponents from "../../modules/create-launchpad/create-launchpad-components";
class CreateLaunchpadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      formData: {},
      loader: false,
    };
  }
  createLaunchpad = (formValue) => {
    let { currentStep, formData } = this.state;
    const merge = Object.assign(formData, formValue);
    if (currentStep === 2 || currentStep === 3) {
      //  Call Function
      this.setState({
        currentStep: currentStep === 3 ? currentStep : currentStep + 1,
        loader: true,
      });
    } else {
      this.setState({
        currentStep: currentStep === 3 ? currentStep : currentStep + 1,
        formData: merge,
      });
    }
  };
  goToStep = (step) => {
    this.setState({ currentStep: step });
  };
  render() {
    const { loader, currentStep } = this.state;
    return (
      <>
        <LaunchpadLayout
          activeTab={"factory"}
          Container={
            <Spin spinning={loader}>
              <CreateLaunchpadComponents
                createLaunchpad={this.createLaunchpad}
                goToStep={this.goToStep}
                currentStep={currentStep}
              />
            </Spin>
          }
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
