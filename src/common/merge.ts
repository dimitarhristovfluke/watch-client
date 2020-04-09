const setProperty = <T, K extends keyof T>(key: K, v: T[K], obj: T): T => ({
  ...obj,
  [key as string]: v
});

// ========================================================================== //
//
// ╔═╗┬ ┬┌─┐┌─┐┌─┐┌┬┐┌─┐  ╔╦╗┌─┐┬─┐┌─┐┌─┐  ╔═╗┌─┐┌─┐┌┬┐
// ╠═╣│││├┤ └─┐│ ││││├┤   ║║║├┤ ├┬┘│ ┬├┤   ╠╣ ├┤ └─┐ │
// ╩ ╩└┴┘└─┘└─┘└─┘┴ ┴└─┘  ╩ ╩└─┘┴└─└─┘└─┘  ╚  └─┘└─┘ ┴
//
// All the mergeN functions represent the immutable, type-safe version of
// R.assocPath, that is:
//
//    mergeN(k1, k2, ..., kN, value, obj);
//
// is the immutable version of:
//
//   obj[k1][k2][...][kN] = value;
//
// Note that mergeN will create empty objects for undefined intermediate keys,
// for example:
//
//
//   interface C { val: number }
//   interface B { c: C }
//   interface A { b: B }
//
//   const a:A = undefined;
//
//   merge3('b', 'c', 'val', 123 , a) // { b: { c: { val: 123 } } }
//
// ========================================================================== //

// The immutable version of:
//   obj[key] = value;
//
const mapProperty = <T, K extends keyof T>(
  key: K,
  fn: (child: T[K], key?: K) => T[K],
  obj: T
): T => setProperty(key, fn(obj?.[key], key), obj);

// The immutable version of:
//   obj[k1] = value;
//
export const merge1 = setProperty;

// The immutable version of:
//   obj[k1][k2] = value;
//
export const merge2 = <T, K1 extends keyof T, K2 extends keyof T[K1]>(
  k1: K1,
  k2: K2,
  value: T[K1][K2],
  obj: T
): T => mapProperty(k1, child => setProperty(k2, value, child), obj);

// The immutable version of:
//   obj[k1][k2][k3] = value;
//
export const merge3 = <
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(
  k1: K1,
  k2: K2,
  k3: K3,
  value: T[K1][K2][K3],
  obj: T
): T => mapProperty(k1, child => merge2(k2, k3, value, child), obj);

// The immutable version of:
//   obj[k1][k2][k3][k4] = value;
//
export const merge4 = <
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  value: T[K1][K2][K3][K4],
  obj: T
): T => mapProperty(k1, child => merge3(k2, k3, k4, value, child), obj);

// The immutable version of:
//   obj[k1][k2][k3][k4][k5] = value;
//
export const merge5 = <
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  value: T[K1][K2][K3][K4][K5],
  obj: T
): T => mapProperty(k1, child => merge4(k2, k3, k4, k5, value, child), obj);

interface Chain<ROOT> {
  set: (key: any, value: any) => this;
  prop: (key: any) => Chain<ROOT>;
  output: () => ROOT;
  whereAmI: () => string;
}

class ChildChain<SOURCE, ROOT, PARENT extends Chain<ROOT>>
  implements Chain<ROOT> {
  protected changes: Partial<SOURCE> = {};
  constructor(
    protected source: SOURCE = {} as SOURCE,
    private parent: PARENT,
    private parentKey: PropertyKey
  ) {}
  prop<KEY extends keyof SOURCE>(
    key: KEY
  ): ChildChain<SOURCE[KEY], ROOT, ChildChain<SOURCE, ROOT, PARENT>> {
    return new ChildChain<SOURCE[KEY], ROOT, ChildChain<SOURCE, ROOT, PARENT>>(
      this.source[key],
      this,
      key
    );
  }
  up(): PARENT {
    const thisOutput = { ...this.source, ...this.changes };
    return this.parent.set(this.parentKey, thisOutput);
  }
  set<KEY extends keyof SOURCE>(key: KEY, value: SOURCE[KEY]) {
    this.changes[key] = value;
    return this;
  }
  setWith<KEY extends keyof SOURCE>(
    key: KEY,
    transform: (oldVal: SOURCE[KEY]) => SOURCE[KEY]
  ) {
    return this.set(key, transform(this.source[key]));
  }
  setMany(changes: Partial<SOURCE>) {
    this.changes = { ...this.changes, ...changes };
    return this;
  }
  output(): ROOT {
    return this.up().output();
  }
  whereAmI(): string {
    return this.parent.whereAmI() + "." + (this.parentKey || "").toString();
  }
}

class ParentChain<SOURCE> extends ChildChain<SOURCE, SOURCE, Chain<SOURCE>> {
  constructor(source: SOURCE) {
    super(source, undefined, undefined);
  }
  up(): Chain<SOURCE> {
    throw new Error("cannot call up on root of chain");
  }
  output(): SOURCE {
    const thisOutput = { ...this.source, ...this.changes };
    return thisOutput;
  }
  whereAmI() {
    return "root";
  }
}

export const mergeChain = <T>(obj: T) => new ParentChain<T>(obj);
