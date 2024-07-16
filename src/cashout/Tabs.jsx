
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import SendMoney from "../sendmoney/SendMoney";
import CashIn from "./CashIn";

export function TabBox() {
    const data = [
        {
            label: "Send Money",
            value: "sendMoney",
            desc: <SendMoney />,
        },
        {
            label: "Cash In",
            value: "cashIn",
            desc: <CashIn />,
        },
    ];

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Tabs value="sendMoney" color="lightBlue">
                <TabsHeader>
                    {data.map(({ label, value }) => (
                        <Tab key={value} value={value} className="min-w-max">
                            <div className="flex items-center gap-2">
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value} className="p-4">
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}
