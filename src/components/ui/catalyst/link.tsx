/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from "@headlessui/react";
import React, { forwardRef } from "react";
import NextLink, { LinkProps } from "next/link";

/**
 * 创建一个链接组件，该组件使用了React的forwardRef来传递ref到内部的NextLink组件。
 * 这允许对HTML锚点元素进行直接的DOM操作或获取其引用，同时封装了Headless.DataInteractive组件以提供额外的交互数据。
 *
 * @param props - 包含LinkProps和React.ComponentPropsWithoutRef<"a">的合并属性。
 *                LinkProps可能包含自定义的链接行为或样式，而React.ComponentPropsWithoutRef<"a">
 *                确保了所有适用于HTML a元素的属性都可以被传递。
 * @param ref - 一个向前的引用，用于直接访问底层的HTML锚点元素。
 * @returns 返回一个封装了Headless.DataInteractive和NextLink组件的链接元素。
 */
export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  // 将链接相关属性和ref传递给内部的NextLink组件，
  // 同时利用Headless.DataInteractive组件来增强交互体验。
  return (
    <Headless.DataInteractive>
      <NextLink {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});
