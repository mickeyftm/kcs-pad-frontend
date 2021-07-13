import React from "react";
import { Button, Form } from "antd";
import DjangoCSRFToken from "django-react-csrftoken";
import stepCompleted from "./../../assets/icons/step-completed.png";
import stepPending from "./../../assets/icons/step-pending.png";
import CreateLaunchpadForm1 from "./widgets/create-launchpad-form1";
import CreateLaunchpadForm2 from "./widgets/create-launchpad-form2";
import CreateLaunchpadForm3 from "./widgets/create-launchpad-form3";
class CreateLaunchpadComponents extends React.Component {
  render() {
    const { currentStep, goToStep, createLaunchpad } = this.props;
    const steps = [
      {
        content: <CreateLaunchpadForm1 />,
      },
      {
        content: <CreateLaunchpadForm2 />,
      },
      {
        content: <CreateLaunchpadForm3 />,
      },
    ];
    return (
      <>
        <div
          className="create-launchpad-form-layout"
          style={
            currentStep === 3
              ? { height: 440, paddingBottom: 50 }
              : { paddingBottom: 50 }
          }
        >
          <div className="create-gather-txt">Create Launchpad </div>
          <div className="form-steps">
            <div className="row">
              <div className="float-left col padding0">
                <div className="float-left">
                  <img
                    className="pointer"
                    src={currentStep < 1 ? stepPending : stepCompleted}
                    onClick={() => goToStep(0)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 1
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    Verify Token
                  </div>
                </div>
                <div style={{ marginLeft: 40 }}>
                  <hr
                    className={
                      currentStep < 1
                        ? "from-step-line"
                        : "from-step-line bg-clr-blue"
                    }
                  />
                </div>
              </div>
              <div className="float-left col padding0">
                <div
                  className={
                    currentStep < 2
                      ? "not-allowed float-left"
                      : "pointer float-left"
                  }
                >
                  <img
                    className={currentStep < 2 ? "disable" : "pointer"}
                    src={currentStep < 2 ? stepPending : stepCompleted}
                    onClick={() => goToStep(1)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 2
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    DeFi Launchpad Info
                  </div>
                </div>
                <div style={{ marginLeft: 40 }}>
                  <hr
                    className={
                      currentStep < 2
                        ? "from-step-line"
                        : "from-step-line bg-clr-blue"
                    }
                  />
                </div>
              </div>{" "}
              <div className="float-left col padding0">
                <div
                  className={
                    currentStep < 2
                      ? "not-allowed float-left"
                      : "pointer float-left"
                  }
                >
                  <img
                    className={currentStep < 2 ? "disable" : "pointer"}
                    src={currentStep < 2 ? stepPending : stepCompleted}
                    onClick={() => goToStep(1)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 2
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    Add Additional Info
                  </div>
                </div>
                <div style={{ marginLeft: 40 }}>
                  <hr
                    className={
                      currentStep < 2
                        ? "from-step-line"
                        : "from-step-line bg-clr-blue"
                    }
                  />
                </div>
              </div>
              <div className="float-left padding0">
                <div
                  className={
                    currentStep < 3
                      ? "not-allowed float-left"
                      : "pointer float-left"
                  }
                >
                  <img
                    className={currentStep < 3 ? "disable" : "pointer"}
                    src={currentStep < 3 ? stepPending : stepCompleted}
                    onClick={() => goToStep(2)}
                    alt="step"
                  />
                  <div
                    className={
                      currentStep !== 3
                        ? "steptxt-pending"
                        : "steptxt-completed"
                    }
                  >
                    Review
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gather-steps-content">
            <Form
              name="startGatherForm"
              id="startGatherForm"
              initialValues={{}}
              onFinish={createLaunchpad}
            >
              <DjangoCSRFToken />
              {currentStep !== 3 && (
                <>
                  {" "}
                  {steps[currentStep].content}
                  <div className="padT30">
                    <Button type="secondary" size="large" htmlType="submit">
                      <span className="continue-txt">
                        {currentStep === 2 ? "Submit" : "Continue"}
                      </span>
                    </Button>
                  </div>
                  {/* <div className="padT10 padB30">
                    <span
                      className="gather-sub-head"
                      style={{ color: "#FF483B", fontWeight: 600 }}
                    >
                      {" "}
                      <i>
                        *Warning : GatherDAO does not support deflationary
                        tokens
                      </i>
                    </span>
                  </div> */}
                </>
              )}
              {currentStep === 3 && (
                <div className="center padT30">
                  <br />
                  Error Message
                </div>
              )}
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default CreateLaunchpadComponents;
