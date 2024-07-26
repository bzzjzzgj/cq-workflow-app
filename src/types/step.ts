export default interface Step {
  /** 唯一标识 */
  id: string;

  /** 名称 */
  name: string;

  /** 描述 */
  desc?: string;

  /** 颜色 */
  color: string;
}
