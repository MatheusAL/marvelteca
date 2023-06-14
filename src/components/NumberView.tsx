import { useSpring, animated } from "react-spring";

interface NumberViewProps {
  number: number;
  label: string;
}
interface NumberAnimatedProps {
  num: number;
}
const Number = ({ num }: NumberAnimatedProps) => {
  const { value } = useSpring({
    from: { value: 0 },
    value: num,
    delay: 120,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div className="flex justify-center text-[60px]">
      {value.to((n) => n.toFixed(0))}
    </animated.div>
  );
};
export default function NumberView({ number, label }: NumberViewProps) {
  return (
    <div className="flex flex-col hover:text-red-700">
      {/* <b className="flex justify-center text-[36px]">{number}</b> */}
      <Number num={number} />
      <b className="text-[36px]">{label}</b>
    </div>
  );
}
