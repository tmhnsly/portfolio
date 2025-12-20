"use client";

import React from "react";
import s from "./Typography.module.scss";

export const Em = (props: React.HTMLAttributes<HTMLElement>) => (
  <em className={s.em} {...props} />
);