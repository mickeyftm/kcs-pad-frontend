import React from "react";
import { FormattedMessage } from "react-intl";

const MENU = (activeKey) => [
  {
    key: "DASHBOARD",
    type: "item",
    childComponent: (
      <span>
        <span className="item-menu">
          <FormattedMessage id="label.menu.dashboard" />
        </span>
      </span>
    ),
    childItems: [],
  },
  {
    key: "PARAMETERSETUP",
    type: "subitem",
    childComponent: (
      <span>
        <span className="item-menu">
          <FormattedMessage id="label.menu.parametersetup" />
        </span>
      </span>
    ),
    childItems: [
      {
        key: "COMPANY_PARAMETER",
        type: "item",
        childComponent: (
          <span>
            <span className="item-menu-child">
              <FormattedMessage id="label.menu.parametersetup.companyparameter" />
            </span>
          </span>
        ),
        childItems: [],
      },
      {
        key: "CALENDAR",
        type: "item",
        childComponent: (
          <span>
            <span className="item-menu-child">
              <FormattedMessage id="label.menu.parametersetup.calendar" />
            </span>
          </span>
        ),
        childItems: [],
      },
      {
        key: "BRANCH",
        type: "item",
        childComponent: (
          <span>
            <span className="item-menu-child">
              <FormattedMessage id="label.menu.parametersetup.branch" />
            </span>
          </span>
        ),
        childItems: [],
      },
      {
        key: "CURRENCY",
        type: "item",
        childComponent: (
          <span>
            <span className="item-menu-child">
              <FormattedMessage id="label.menu.parametersetup.currency" />
            </span>
          </span>
        ),
        childItems: [],
      },
      {
        key: "CURRENCY_RATE",
        type: "item",
        childComponent: (
          <span>
            <span className="item-menu-child">
              <FormattedMessage id="label.menu.parametersetup.currencyrate" />
            </span>
          </span>
        ),
        childItems: [],
      },
      {
        key: "ACCOUNT_OFFICER",
        type: "item",
        childComponent: (
          <span>
            <span className="item-menu-child">
              <FormattedMessage id="label.menu.parametersetup.accountofficer" />
            </span>
          </span>
        ),
        childItems: [],
      },
      {
        key: "CORE_SETUP_AUTHORIZATION",
        type: "item",
        childComponent: (
          <span>
            <span className="item-menu-child">
              <FormattedMessage id="label.menu.core.setup.authorization" />
            </span>
          </span>
        ),
        childItems: [],
      },
    ],
  },
];

export default MENU;
