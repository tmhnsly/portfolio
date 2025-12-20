"use client";

import React from "react";
import s from "./Typography.module.scss";

export const Strong = (props: React.HTMLAttributes<HTMLElement>) => (
  <strong className={s.strong} {...props} />
);
