include Nanoc::Helpers::Filtering # filter(filter_name, arguments, &block) → void

include Nanoc::Helpers::Tagging # tags_for(item, params) → String

include Nanoc::Helpers::Rendering # render(identifier, other_assigns, &block) → String

include Nanoc::Helpers::LinkTo # link_to(text, target, attributes) → String
                               # link_to_unless_current(text, target, attributes) → String
                               # relative_path_to(target) → String

include Nanoc::Helpers::Breadcrumbs # breadcrumbs_trail() → Array
                                    # item_with_identifier(identifier)
                                    # breadcrumbs_for_identifier(identifier)

# Finding items by identifier
# @items['/blah/'] → returns the item with identifier '/blah/'
