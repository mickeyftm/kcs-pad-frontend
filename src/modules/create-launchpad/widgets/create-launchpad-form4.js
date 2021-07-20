import { PaperClipIcon } from "@heroicons/react/solid";
import { Col } from "antd";

export default function CreateLaunchpadForm4() {
  return (
    <Col>
      <div className="sm:rounded-lg">
        <div className="text-center pb-10">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Review
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total token</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                500 TT
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Token name</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Test
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Token symbol
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                TT
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Token decimals
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                6
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Presale rate
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                2 TT
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Softcap</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                5 BNB
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Hardcap</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                10 BNB
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Minimum buy</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                5 BNB
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Start time</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                2021-07-22T13:34 (UTC)
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">End time</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                2021-07-23T13:34 (UTC)
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                https://www.gatherdao.com/
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Col>
  );
}
