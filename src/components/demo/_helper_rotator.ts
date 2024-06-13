export const rotationHandler = (container: HTMLDivElement, speed: number) => {
  const items = container.querySelectorAll<HTMLSpanElement>("span");

  let current = 0;
  let total = items.length;

  const currItem = items[current];

  if (currItem) {
    currItem.classList.add("text-rotator-item__active");
  }

  const rotate = () => {
    let next = current + 1;
    if (next >= total) next = 0;

    const c = items[current];
    const n = items[next];

    if (c && n) {
      c?.classList.remove("text-rotator-item__active");
      n?.classList.add("text-rotator-item__active");

      current = next;
    }
  };

  return setInterval(rotate, speed);
};
