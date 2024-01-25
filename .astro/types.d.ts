declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"learn": {
"cs/network.md": {
	id: "cs/network.md";
  slug: "cs/network";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
"react/josh-css.md": {
	id: "react/josh-css.md";
  slug: "react/josh-css";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
"react/react-hook-advanced.md": {
	id: "react/react-hook-advanced.md";
  slug: "react/react-hook-advanced";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
"react/react-hook.md": {
	id: "react/react-hook.md";
  slug: "react/react-hook";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
"react/react-patterns.md": {
	id: "react/react-patterns.md";
  slug: "react/react-patterns";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
"react/react-performance.md": {
	id: "react/react-performance.md";
  slug: "react/react-performance";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
"react/react-testing.md": {
	id: "react/react-testing.md";
  slug: "react/react-testing";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
"react/useful-links.md": {
	id: "react/useful-links.md";
  slug: "react/useful-links";
  body: string;
  collection: "learn";
  data: any
} & { render(): Render[".md"] };
};
"notes": {
"README.md": {
	id: "README.md";
  slug: "readme";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"algorithm.md": {
	id: "algorithm.md";
  slug: "algorithm";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"c-cpp.md": {
	id: "c-cpp.md";
  slug: "c-cpp";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"data-structure.md": {
	id: "data-structure.md";
  slug: "data-structure";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"design-pattern.md": {
	id: "design-pattern.md";
  slug: "design-pattern";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"devops.md": {
	id: "devops.md";
  slug: "devops";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"excel.md": {
	id: "excel.md";
  slug: "excel";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"functional-programming.md": {
	id: "functional-programming.md";
  slug: "functional-programming";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"git.md": {
	id: "git.md";
  slug: "git";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"golang.md": {
	id: "golang.md";
  slug: "golang";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"linux.md": {
	id: "linux.md";
  slug: "linux";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"nginx-apache.md": {
	id: "nginx-apache.md";
  slug: "nginx-apache";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"nodejs.md": {
	id: "nodejs.md";
  slug: "nodejs";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"odoo.md": {
	id: "odoo.md";
  slug: "odoo";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"python.md": {
	id: "python.md";
  slug: "python";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"random.md": {
	id: "random.md";
  slug: "random";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"rust.md": {
	id: "rust.md";
  slug: "rust";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"sql.md": {
	id: "sql.md";
  slug: "sql";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"terminal.md": {
	id: "terminal.md";
  slug: "terminal";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"typescript.md": {
	id: "typescript.md";
  slug: "typescript";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"uml.md": {
	id: "uml.md";
  slug: "uml";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
"vim.md": {
	id: "vim.md";
  slug: "vim";
  body: string;
  collection: "notes";
  data: any
} & { render(): Render[".md"] };
};
"posts": {
"70-480.md": {
	id: "70-480.md";
  slug: "70-480";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"javascript-snippets.md": {
	id: "javascript-snippets.md";
  slug: "javascript-snippets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"moving-to-astro.md": {
	id: "moving-to-astro.md";
  slug: "moving-to-astro";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"simple-backend-with-pocketbase.md": {
	id: "simple-backend-with-pocketbase.md";
  slug: "simple-backend-with-pocketbase";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
