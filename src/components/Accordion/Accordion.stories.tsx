import type { Meta, StoryObj } from "@storybook/react";

import Accordion from "./Accordion";
import type { AccordionProps } from "./Accordion.interface";

const meta = {
  component: Accordion,
  title: "Components/Accordion",
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const accordionData: AccordionProps = {
  body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, cum
        quas facilis sint commodi fuga. Nam culpa recusandae itaque tempore
        labore veritatis enim id porro magni ducimus aut atque earum quam
        animi doloribus placeat ullam neque, repudiandae reprehenderit iste
        fugit delectus distinctio! Tenetur sapiente corrupti dignissimos
        doloribus! Quibusdam sint voluptatum cumque consequuntur eaque,
        laborum repellendus ratione est commodi? Quidem, ut nisi esse
        assumenda, nihil iure laborum quaerat, eos sint ad ducimus
        veritatis. Aut tenetur tempora praesentium labore, cupiditate eius
        impedit, quod neque error consectetur sapiente nobis voluptates ea,
        officiis at perspiciatis dicta? Sapiente soluta aliquam similique et
        amet quaerat doloribus.`,
  nextButton: true,
  title: "TITLE GOES HERE",
};
export const AccordionStory = {
  name: "Accordion",
  args: accordionData,
} satisfies Story;
