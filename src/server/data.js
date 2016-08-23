module.exports = {
    notes: getNotes(),
    courses: getCourses()
};

function getNotes() {
    return [
        {
            id: 1,
            title: 'Ordinary Differential Equations',
            content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
            course: 'numerical-methods'},
        {
            id: 2,
            title: 'Autonomous ODEs',
            content: 'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.',
            course: 'numerical-methods'},
        {
            id: 3,
            title: 'Fast Fourier Transformation',
            content: 'Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
            course: 'numerical-methods'}
    ];
}

function getCourses(){
    return [
        {id: 1, name: 'Numerical Methods', slug: 'numerical-methods'},
        {id: 2, name: 'Linear Algebra', slug: 'linear-algebra'},
        {id: 3, name: 'Analysis', slug: 'analysis'}
    ];
}
