import { assert } from "@sindresorhus/is";
import { useRouter } from "next/router";

const SelectLang = () => {
  const router = useRouter();
  return (
    <>
      <label htmlFor="lang">Select your language</label>
      <select
        id="lang"
        name="lang"
        onChange={(event) => {
          assert.string(router.query.slug);
          router.push(router.query.slug, "", {
            locale: event.target.value,
          });
        }}
      >
        <option value="en">English</option>
        <option value="jp">Japanese</option>
        <option value="zh">Chinese</option>
      </select>
    </>
  );
};

export default SelectLang;
