import { Title } from "@solidjs/meta";
import { Show, createSignal, onMount } from "solid-js";

import data from "~/lib/data";

function randomIDX(maxLength) {
  return Math.floor(Math.random() * maxLength);
}
export default function Home() {
  const dateNow = new Date().setHours(0, 0, 0, 0);
  const [idx, setIdx] = createSignal(-1);

  const refreshIDX = () => {
    const newIdx = randomIDX(data.length);
    localStorage.setItem("idx", newIdx);
    localStorage.setItem("date", dateNow);
    setIdx(newIdx);
  };
  onMount(() => {
    const storedDate = +localStorage.getItem("date");
    const storedIdx = localStorage.getItem("idx");

    if (storedDate < dateNow || storedIdx === null) refreshIDX();
    else {
      setIdx(+localStorage.getItem("idx"));
    }
  });

  return (
    <main>
      <Title>Tongue Twisters</Title>
      <h1>Tongue Twisters</h1>
      <button
        onClick={() => {
          refreshIDX();
        }}
      >
        Refresh
      </button>
      <Show when={idx() > -1} fallback={<p>Loading.....</p>}>
        <p innerText={data[idx()].text}></p>
      </Show>
    </main>
  );
}
