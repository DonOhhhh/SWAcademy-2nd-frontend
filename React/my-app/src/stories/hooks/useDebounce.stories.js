import { Fragment, useState } from "react";
import useDebounce from "../../base/hooks/useDebounce";

export default {
    title: "Hook/useDebounce",
};

const companies = [
    "Cobalt",
    "Grepp",
    "KaKao",
    "Naver",
    "Daangn",
    "Coupang",
    "Line",
    "Woowahan",
];

export const Default = () => {
    const [value, setValue] = useState("");
    const [result, setResult] = useState([]);

    useDebounce(
        () => {
            if (value === "") setResult([]);
            else
                setResult(
                    companies.filter((company) =>
                        company.toLowerCase().includes(value.toLowerCase())
                    )
                );
        },
        300,
        [value]
    );

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div>
                {result.map((item) => (
                    <Fragment key={item}>
                        {item}
                        <br />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
