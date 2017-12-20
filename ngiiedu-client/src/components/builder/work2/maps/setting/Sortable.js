import React from 'react';


class Sortable extends React.Component {
    componentDidMount() {
        // Every React component has a function that exposes the
        // underlying DOM node that it is wrapping. We can use that
        // DOM node, pass it to jQuery and initialize the plugin.

        // You'll find that many jQuery plugins follow this same pattern
        // and you'll be able to pass the component DOM node to jQuery
        // and call the plugin function.

        // Get the DOM node and store the jQuery element reference
        this.$node = $(this.refs.sortable);

        // Initialize the jQuery UI functionality you need
        // in this case, the Sortable: https://jqueryui.com/sortable/
        this.$node.sortable({
            // Get the incoming `opacity` prop and use it in the plugin configuration
            opacity: this.props.opacity,
            // Get the incoming onChange func and we invoke it on the Sortable `change` event
            change: (event, ui) => this.props.onChange(event, ui)
        });
    }
    
    // Force a single-render of the component,
    // by returning false from shouldComponentUpdate ReactJS lifecycle hook.
    // Right after ReactJS adds the element in the actual DOM,
    // we need to pass the future control to jQuery.
    // This way, ReactJS will never re-render our component,
    // and jQuery will be responsible for all updates.
    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        // Each time when component receives new props,
        // we should trigger refresh or perform anything else we need.
        // For this example, we'll update only the enable/disable option,
        // as soon as we receive a different value for this.props.enable
        if (nextProps.enable !== this.props.enable) {
            this.$node.sortable(nextProps.enable ? 'enable' : 'disable');
        }
    }

    // jQuery UI sortable expects a <ul> list with <li>s.
    renderItems() {
        return this.props.data.map( (item, i) =>
            <li key={i} className="ui-state-default" id={item.id}>
                <span className="ui-icon ui-icon-arrowthick-2-n-s"></span>
                { item.title }
            </li>
        );
    }
    render() {
        return (
            <ul ref="sortable">
                { this.renderItems() }
            </ul>
        );
    }

    componentWillUnmount() {
        // Clean up the mess when the component unmounts
        this.$node.sortable('destroy');
    }
};

// Optional: set the default props, in case none are passed
Sortable.defaultProps = { opacity: 1, enable: true };

// Optional: set the prop types
Sortable.propTypes = {
    opacity: React.PropTypes.number,
    enable: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
};

export default Sortable;